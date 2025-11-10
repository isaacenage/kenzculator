# PWA Setup Instructions

Your Percentage Calculator has been successfully converted to a Progressive Web App (PWA)! Follow these steps to complete the setup and test it.

## Files Created

1. **manifest.json** - PWA configuration file
2. **service-worker.js** - Handles offline functionality and caching
3. **generate-icons.html** - Tool to generate PWA icons
4. **index.html** - Updated with PWA meta tags and service worker registration

## Step 1: Generate Icons

1. Open `generate-icons.html` in your browser
2. Click the "Generate All Icons" button
3. Wait for all 8 icon files to download
4. Create a folder named `icons` in your Calculator directory
5. Move all downloaded icon files into the `icons` folder

The icons will be named:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Step 2: Test Your PWA Locally

### Option 1: Using a Simple HTTP Server (Recommended)

**Python 3:**
```bash
# Navigate to your Calculator directory
cd "C:\Users\enage.isaac\Desktop\Codes\Kenzie\Calculator"

# Start the server
python -m http.server 8000
```

**Node.js (if you have it installed):**
```bash
npx http-server -p 8000
```

### Option 2: Using VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Step 3: Access Your PWA

1. Open your browser and navigate to `http://localhost:8000`
2. Open Chrome DevTools (F12)
3. Go to the "Application" tab
4. Check the following:
   - **Manifest**: Should show your app details
   - **Service Workers**: Should show the service worker as activated
   - **Cache Storage**: Should show cached files

## Step 4: Install the PWA

### On Desktop (Chrome/Edge):
1. Look for the install icon in the address bar (usually a + or computer icon)
2. Click it and select "Install"
3. The app will open in its own window

### On Mobile:
1. Open the site in Chrome (Android) or Safari (iOS)
2. For Chrome: Tap the menu (⋮) → "Add to Home screen"
3. For Safari: Tap the Share button → "Add to Home Screen"
4. The app icon will appear on your home screen

## Step 5: Test Offline Functionality

1. Install the PWA (see Step 4)
2. Open Chrome DevTools → Network tab
3. Check "Offline" checkbox
4. Refresh the page
5. The calculator should still work!

## PWA Features Included

### Core Features:
- ✅ **Installable** - Can be installed on home screen
- ✅ **Offline Support** - Works without internet connection
- ✅ **Responsive** - Works on mobile and desktop
- ✅ **App-like** - Runs in standalone window
- ✅ **Fast** - Cached resources load instantly

### Advanced Features:
- ✅ **Background Sync** - Ready for future sync features
- ✅ **Push Notifications** - Framework included (optional)
- ✅ **Auto-updates** - Checks for updates every minute
- ✅ **Themed** - Uses your cyan (#27e1fa) theme color

## Browser Support

Works best on:
- Chrome/Edge (Desktop & Mobile)
- Safari (iOS 11.3+)
- Firefox
- Samsung Internet
- Opera

## Troubleshooting

### Icons not showing?
- Make sure the `icons` folder is in the same directory as `index.html`
- Check that all icon files are present
- Clear browser cache and reload

### Service Worker not registering?
- PWAs require HTTPS or localhost
- Check browser console for errors
- Make sure `service-worker.js` is in the root directory

### Can't install on mobile?
- Make sure you're using HTTPS (or localhost for testing)
- Some browsers require user interaction with the site before showing install prompt
- Try scrolling or clicking on the calculator first

### Manifest errors?
- Open DevTools → Application → Manifest
- Check for any errors or warnings
- Ensure `manifest.json` is properly linked in index.html

## Deployment to Production

To make your PWA available online with HTTPS:

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Push your files
3. Enable GitHub Pages in repository settings
4. Your PWA will be available at `https://yourusername.github.io/calculator`

### Option 2: Netlify/Vercel (Free)
1. Sign up for Netlify or Vercel
2. Connect your GitHub repository or drag & drop files
3. Your PWA will automatically deploy with HTTPS

### Option 3: Firebase Hosting (Free)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase init hosting`
3. Run `firebase deploy`

## Testing Your PWA

Use these tools to validate your PWA:

1. **Lighthouse** (built into Chrome DevTools)
   - Open DevTools → Lighthouse tab
   - Select "Progressive Web App"
   - Click "Generate report"
   - Aim for 100/100 score!

2. **PWA Builder**
   - Visit https://www.pwabuilder.com/
   - Enter your site URL
   - Get detailed PWA analysis

## Next Steps

Consider adding:
- **Install Button**: Custom UI to prompt users to install
- **Update Notification**: Alert users when a new version is available
- **Offline Page**: Custom page shown when content isn't cached
- **Analytics**: Track usage and installation metrics

Enjoy your PWA! 🚀
