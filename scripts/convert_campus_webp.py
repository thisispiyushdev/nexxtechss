import os
from PIL import Image

src_dir = os.path.join("frontend", "assets", "campus")
dst_dir = os.path.join("frontend", "public", "campus")
os.makedirs(dst_dir, exist_ok=True)

files = [f for f in os.listdir(src_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
files.sort()

count = 0
for f in files:
    src_path = os.path.join(src_dir, f)
    try:
        im = Image.open(src_path)
        im = im.convert("RGB")
        w, h = im.size
        max_dim = 1600
        if max(w, h) > max_dim:
            if w > h:
                new_w = max_dim
                new_h = int(h * (max_dim / w))
            else:
                new_h = max_dim
                new_w = int(w * (max_dim / h))
            im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        count += 1
        out_name = f"campus-{count}.webp"
        out_path = os.path.join(dst_dir, out_name)
        im.save(out_path, "WEBP", quality=85)
        print(f"Converted {f} -> {out_name} ({im.size[0]}x{im.size[1]})")
    except Exception as e:
        print(f"Error converting {f}: {e}")

print(f"Successfully converted {count} campus images to WebP in {dst_dir}")
