import { writeFile, mkdir, readdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Admin password (change this to your own secure password)
const ADMIN_PASSWORD = "waloo123";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const password = formData.get('password');
    const category = formData.get('category') || 'uncategorized';
    
    // Check admin password
    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Incorrect password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create organized folder structure by date and category
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const uploadDir = join(process.cwd(), 'public', 'uploads', category, `${year}-${month}-${day}`);
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    // Get file extension and create unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const originalName = file.name;
    const extension = originalName.split('.').pop();
    const timestamp = Date.now();
    const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${safeName}`;
    const filepath = join(uploadDir, filename);
    
    // Save file
    await writeFile(filepath, buffer);
    
    // Return the public URL
    const publicUrl = `/uploads/${category}/${year}-${month}-${day}/${filename}`;
    
    return new Response(JSON.stringify({ 
      success: true, 
      url: publicUrl,
      filename: originalName,
      category: category,
      date: `${year}-${month}-${day}`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Delete file endpoint
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('url');
    const password = searchParams.get('password');
    
    // Check admin password
    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Incorrect password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!fileUrl) {
      return new Response(JSON.stringify({ error: 'No file URL provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Convert public URL to file path
    const filePath = join(process.cwd(), 'public', fileUrl);
    
    if (existsSync(filePath)) {
      await unlink(filePath);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: 'File not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Get all uploaded files
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    
    // Check admin password
    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized. Incorrect password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    const files = [];
    
    async function scanDir(dir, basePath = '') {
      const items = await readdir(dir, { withFileTypes: true });
      for (const item of items) {
        const fullPath = join(dir, item.name);
        const relativePath = join(basePath, item.name);
        if (item.isDirectory()) {
          await scanDir(fullPath, relativePath);
        } else {
          files.push({
            name: item.name,
            url: `/uploads/${relativePath.replace(/\\/g, '/')}`,
            path: relativePath
          });
        }
      }
    }
    
    if (existsSync(uploadsDir)) {
      await scanDir(uploadsDir);
    }
    
    return new Response(JSON.stringify({ files }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}