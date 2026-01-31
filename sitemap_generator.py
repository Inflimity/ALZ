import os
import datetime
from pathlib import Path

# Configuration
BASE_URL = "https://alztrust.com/"
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
IGNORE_DIRS = {'.git', 'node_modules', 'vendor', 'assets', '.gemini'}
OUTPUT_FILE = "sitemap.xml"

def get_html_files(root_dir):
    html_files = []
    for root, dirs, files in os.walk(root_dir):
        # Filter out ignored directories
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for file in files:
            if file.endswith(".html"):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, root_dir)
                
                # Handle index.html specially - usually maps to the root URL
                if rel_path == "index.html":
                    url_path = ""
                else:
                    url_path = rel_path.replace(os.path.sep, "/")
                
                last_mod = datetime.datetime.fromtimestamp(os.path.getmtime(full_path)).strftime('%Y-%m-%d')
                html_files.append((url_path, last_mod))
    return html_files

def generate_sitemap(files):
    xml_content = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml_content.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    
    for url_path, last_mod in files:
        full_url = f"{BASE_URL}{url_path}"
        xml_content.append('  <url>')
        xml_content.append(f'    <loc>{full_url}</loc>')
        xml_content.append(f'    <lastmod>{last_mod}</lastmod>')
        xml_content.append('    <changefreq>weekly</changefreq>')
        xml_content.append('    <priority>1.0</priority>')
        xml_content.append('  </url>')
    
    xml_content.append('</urlset>')
    
    return "\n".join(xml_content)

def main():
    print(f"Scanning for HTML files in {ROOT_DIR}...")
    files = get_html_files(ROOT_DIR)
    print(f"Found {len(files)} generated pages.")
    
    sitemap_xml = generate_sitemap(files)
    
    output_path = os.path.join(ROOT_DIR, OUTPUT_FILE)
    with open(output_path, "w") as f:
        f.write(sitemap_xml)
    
    print(f"Sitemap successfully generated at {output_path}")

if __name__ == "__main__":
    main()
