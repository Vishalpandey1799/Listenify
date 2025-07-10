 

```
┌──────────────────────┐
│       User Input     │
│    (URL Submission)  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Backend (Express)  │
│  - /api/generate     │
│  - /download/:file   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Puppeteer          │
│  - page.screenshot() │
│  - page.pdf()        │
│  - screen-recorder   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Output Files       │
│  - screenshot.png    │
│  - document.pdf      │
│  - recording.mp4     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   User Download      │
│  (Express serves)    │
└──────────────────────┘
```

### Tools Mapped to Steps:
1. **User Input** → HTML form (no tool, pure frontend)  
2. **Backend** → `Express.js` (routes + file serving)  
3. **Puppeteer** →  
   - Screenshot: `page.screenshot()`  
   - PDF: `page.pdf()`  
   - Video: `puppeteer-screen-recorder` (requires `ffmpeg`)  
4. **Output** → Local filesystem or S3 (not shown for minimalism)  
5. **Download** → Express `res.download()`  

### Why This Works:
- **Zero extra tools** – Just Puppeteer + Express.  
- **Video optional** – Remove `screen-recorder`/`ffmpeg` if unneeded.  
- **Stateless** – No database required (files deleted after download).  

 