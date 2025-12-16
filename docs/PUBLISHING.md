# Publishing Mexican Night Theme

This document outlines the steps to publish the Mexican Night VS Code theme to GitHub and the VS Code Marketplace.

## Current Status

✅ **Completed:**
- Theme installed locally in VS Code (can activate with Cmd+K Cmd+T → "Mexican Night")
- package.json updated with correct publisher name (`wowzontle`) and GitHub URL
- Git repository initialized with first commit
- Remote configured: https://github.com/fruizg0302/mexican-night.git

## Next Steps

### 1. Push to GitHub

**Create the GitHub Repository:**
1. Navigate to https://github.com/new
2. Fill in the details:
   - **Repository name**: `mexican-night`
   - **Description**: "A VS Code theme celebrating the lights of Mexico City at night"
   - **Visibility**: **Public** (required for VS Code Marketplace)
   - **Important**: Do NOT initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

**Push the Code:**
```bash
# Push to GitHub (the branch is already renamed to 'main' and remote is configured)
git push -u origin main
```

**Verify:**
- Visit https://github.com/fruizg0302/mexican-night to see your theme repository

### 2. Publish to VS Code Marketplace

#### 2.1 Create Publisher Account

1. Visit https://marketplace.visualstudio.com/manage
2. Sign in with your Microsoft account or GitHub account
3. Click "Create Publisher"
4. Fill in:
   - **ID**: `wowzontle` (must match package.json)
   - **Name**: Your display name (e.g., "Wowzontle")
   - **Description**: Optional description about yourself

#### 2.2 Generate Personal Access Token (PAT)

1. Go to https://dev.azure.com/
2. Sign in with the same Microsoft/GitHub account
3. Click on your profile icon (top right) → **"Personal access tokens"**
4. Click **"+ New Token"**
5. Configure the token:
   - **Name**: `VS Code Extensions` (or any memorable name)
   - **Organization**: Select "All accessible organizations"
   - **Expiration**: Custom (recommend 1 year or more)
   - **Scopes**:
     - Click "Show all scopes"
     - Scroll down and find **"Marketplace"**
     - Check **"Manage"** under Marketplace
6. Click **"Create"**
7. **IMPORTANT**: Copy the token immediately and save it securely (you won't see it again!)

#### 2.3 Install vsce (VS Code Extension Manager)

```bash
npm install -g @vscode/vsce
```

#### 2.4 Login with vsce

```bash
vsce login wowzontle
```

When prompted, paste your Personal Access Token (PAT) from step 2.2.

#### 2.5 Publish the Extension

**Option A: Publish directly**
```bash
vsce publish
```

**Option B: Package first, then publish (recommended for first time)**
```bash
# Create a .vsix package to inspect
vsce package

# If everything looks good, publish
vsce publish
```

### 3. Verify Publication

1. Wait 5-10 minutes for the marketplace to process your extension
2. Visit https://marketplace.visualstudio.com/items?itemName=wowzontle.mexican-night
3. Search for "Mexican Night" in VS Code Extensions marketplace
4. Install and test from the marketplace

## Before Publishing Checklist

Consider completing these before your first marketplace publish:

- [ ] Test theme thoroughly with different file types (Ruby, JavaScript, TypeScript, etc.)
- [ ] Add screenshots to README.md showing the theme in action
- [ ] Update version to `1.0.0` in package.json (currently `0.0.1`)
- [ ] Review CHANGELOG.md and update with v1.0.0 release notes
- [ ] Add a LICENSE file (MIT is common for themes)
- [ ] Add an icon for your theme (icon.png, 128x128px, update package.json with "icon" field)
- [ ] Test the packaged .vsix locally before publishing

## Updating After Publication

When you make changes to the theme:

1. Edit source files in `src/`
2. Run `npm run build` to regenerate theme JSON
3. Update version in package.json (follow [semver](https://semver.org/))
4. Update CHANGELOG.md
5. Commit and push to GitHub
6. Run `vsce publish` (or `vsce publish patch|minor|major` to auto-increment version)

## Common vsce Commands

```bash
# Package without publishing
vsce package

# Publish with automatic version bump
vsce publish patch   # 1.0.0 -> 1.0.1
vsce publish minor   # 1.0.0 -> 1.1.0
vsce publish major   # 1.0.0 -> 2.0.0

# Publish specific version
vsce publish 1.0.0

# Unpublish (use with caution!)
vsce unpublish wowzontle.mexican-night
```

## Troubleshooting

**Problem**: `vsce: command not found`
**Solution**: Run `npm install -g @vscode/vsce`

**Problem**: "The Personal Access Token has expired"
**Solution**: Generate a new PAT at https://dev.azure.com/ and run `vsce login wowzontle` again

**Problem**: "Publisher 'wowzontle' not found"
**Solution**: Create the publisher at https://marketplace.visualstudio.com/manage first

**Problem**: "Extension validation failed"
**Solution**: Run `vsce package` to see detailed error messages, fix issues in package.json or theme files

## Resources

- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [VS Code Theme Guide](https://code.visualstudio.com/api/extension-guides/color-theme)
- [Marketplace Publisher Management](https://marketplace.visualstudio.com/manage)
- [vsce Documentation](https://github.com/microsoft/vscode-vsce)
