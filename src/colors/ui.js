// UI Colors for Mexican Night Theme
// Maps palette colors to VS Code UI elements

function getUIColors(palette) {
  return {
    // Contrast colors
    "contrastActiveBorder": palette.rosaMexicano,
    "contrastBorder": "#16161e",
    
    // Base colors
    "focusBorder": palette.rosaMexicano,
    "foreground": palette.textSecondary,
    "descriptionForeground": palette.textMuted,
    "errorForeground": palette.error,
    
    // Text colors
    "textLink.foreground": palette.neonBlue,
    "textLink.activeForeground": palette.info,
    "textPreformat.foreground": palette.textPrimary,
    
    // Button colors
    "button.background": palette.rosaMexicano,
    "button.foreground": palette.white,
    "button.hoverBackground": palette.rosaMexicanoLight,
    "button.secondaryBackground": palette.nightSkyMedium,
    "button.secondaryForeground": palette.textPrimary,
    "button.secondaryHoverBackground": palette.nightSkyBright,
    
    // Dropdown colors
    "dropdown.background": palette.nightSky,
    "dropdown.listBackground": palette.nightSkyLight,
    "dropdown.border": palette.nightSkyMedium,
    "dropdown.foreground": palette.textSecondary,
    
    // Input colors
    "input.background": palette.nightSky,
    "input.border": palette.nightSkyMedium,
    "input.foreground": palette.textPrimary,
    "input.placeholderForeground": palette.textDark,
    "inputOption.activeBackground": palette.rosaMexicano + "33",
    "inputOption.activeBorder": palette.rosaMexicano,
    "inputOption.activeForeground": palette.textPrimary,
    "inputValidation.errorBackground": palette.error + "20",
    "inputValidation.errorForeground": palette.error,
    "inputValidation.errorBorder": palette.error,
    "inputValidation.infoBackground": palette.info + "20",
    "inputValidation.infoForeground": palette.info,
    "inputValidation.infoBorder": palette.info,
    "inputValidation.warningBackground": palette.warning + "20",
    "inputValidation.warningForeground": palette.warning,
    "inputValidation.warningBorder": palette.warning,
    
    // Scrollbar
    "scrollbar.shadow": palette.black,
    "scrollbarSlider.activeBackground": palette.gray,
    "scrollbarSlider.background": palette.textDark + "88",
    "scrollbarSlider.hoverBackground": palette.textMuted,
    
    // Badge
    "badge.foreground": palette.white,
    "badge.background": palette.rosaMexicano,
    
    // Progress bar
    "progressBar.background": palette.rosaMexicano,
    
    // Lists and trees
    "list.activeSelectionBackground": palette.nightSkyMedium,
    "list.activeSelectionForeground": palette.textPrimary,
    "list.dropBackground": palette.rosaMexicano + "20",
    "list.focusBackground": palette.nightSkyBright,
    "list.focusForeground": palette.textPrimary,
    "list.highlightForeground": palette.rosaMexicano,
    "list.hoverBackground": palette.nightSkyMedium,
    "list.hoverForeground": palette.textPrimary,
    "list.inactiveSelectionBackground": palette.nightSkyMedium + "aa",
    "list.inactiveSelectionForeground": palette.textSecondary,
    "list.warningForeground": palette.warning,
    "list.errorForeground": palette.error,
    
    // Activity Bar
    "activityBar.background": palette.nightSky,
    "activityBar.border": palette.nightSkyLight,
    "activityBar.foreground": palette.textSecondary,
    "activityBar.inactiveForeground": palette.textDark,
    "activityBarBadge.background": palette.rosaMexicano,
    "activityBarBadge.foreground": palette.white,
    "activityBar.activeBorder": palette.rosaMexicano,
    "activityBar.activeBackground": palette.nightSkyLight + "50",
    
    // Sidebar
    "sideBar.background": palette.nightSkyLight,
    "sideBar.foreground": palette.textSecondary,
    "sideBar.border": palette.nightSky,
    "sideBarTitle.foreground": palette.textPrimary,
    "sideBarSectionHeader.background": palette.nightSky,
    "sideBarSectionHeader.foreground": palette.textPrimary,
    
    // Editor colors
    "editor.background": palette.nightSkyLight,
    "editor.foreground": palette.textPrimary,
    "editorLineNumber.foreground": palette.textDark,
    "editorLineNumber.activeForeground": palette.textMuted,
    "editorCursor.background": palette.nightSkyLight,
    "editorCursor.foreground": palette.rosaMexicano,
    "editor.selectionBackground": palette.rosaMexicano + "30",
    "editor.selectionHighlightBackground": palette.verdeMexicano + "20",
    "editor.wordHighlightBackground": palette.neonBlue + "15",
    "editor.wordHighlightStrongBackground": palette.neonBlue + "25",
    "editor.findMatchBackground": palette.verdeMexicano + "40",
    "editor.findMatchHighlightBackground": palette.verdeMexicano + "20",
    "editor.findRangeHighlightBackground": palette.rosaMexicano + "15",
    "editor.hoverHighlightBackground": palette.neonBlue + "10",
    "editor.lineHighlightBackground": palette.nightSkyMedium + "50",
    "editor.rangeHighlightBackground": palette.rosaMexicano + "15",
    "editorIndentGuide.background": palette.nightSkyMedium,
    "editorIndentGuide.activeBackground": palette.textDark,
    "editorWhitespace.foreground": palette.textDark,
    "editorRuler.foreground": palette.nightSkyMedium,
    "editorCodeLens.foreground": palette.textMuted,
    
    // Editor widget colors
    "editorWidget.background": palette.nightSky,
    "editorWidget.border": palette.nightSkyMedium,
    "editorSuggestWidget.background": palette.nightSky,
    "editorSuggestWidget.border": palette.nightSkyMedium,
    "editorSuggestWidget.foreground": palette.textSecondary,
    "editorSuggestWidget.highlightForeground": palette.rosaMexicano,
    "editorSuggestWidget.selectedBackground": palette.nightSkyMedium,
    "editorHoverWidget.background": palette.nightSky,
    "editorHoverWidget.border": palette.nightSkyMedium,
    
    // Editor groups & tabs
    "editorGroup.border": palette.nightSkyMedium,
    "editorGroupHeader.tabsBackground": palette.nightSky,
    "editorGroupHeader.tabsBorder": palette.nightSkyMedium,
    "tab.activeBackground": palette.nightSkyLight,
    "tab.activeForeground": palette.textPrimary,
    "tab.border": palette.nightSky,
    "tab.activeBorder": palette.rosaMexicano,
    "tab.activeBorderTop": palette.rosaMexicano,
    "tab.inactiveBackground": palette.nightSky,
    "tab.inactiveForeground": palette.textMuted,
    "tab.hoverBackground": palette.nightSkyLight,
    "tab.hoverForeground": palette.textPrimary,
    
    // Editor gutter
    "editorGutter.modifiedBackground": palette.neonBlue,
    "editorGutter.addedBackground": palette.verdeMexicano,
    "editorGutter.deletedBackground": palette.error,
    
    // Diff editor
    "diffEditor.insertedTextBackground": palette.verdeMexicano + "20",
    "diffEditor.removedTextBackground": palette.error + "20",
    
    // Editor bracket matching
    "editorBracketMatch.background": palette.textDark + "40",
    "editorBracketMatch.border": palette.textMuted,
    
    // Panel colors
    "panel.background": palette.nightSky,
    "panel.border": palette.nightSkyMedium,
    "panelTitle.activeBorder": palette.rosaMexicano,
    "panelTitle.activeForeground": palette.textPrimary,
    "panelTitle.inactiveForeground": palette.textMuted,
    
    // Status bar colors
    "statusBar.background": palette.nightSky,
    "statusBar.foreground": palette.textSecondary,
    "statusBar.border": palette.nightSkyLight,
    "statusBar.debuggingBackground": palette.neonOrange,
    "statusBar.debuggingForeground": palette.white,
    "statusBar.noFolderBackground": palette.nightSky,
    "statusBarItem.activeBackground": palette.nightSkyMedium,
    "statusBarItem.hoverBackground": palette.nightSkyMedium + "80",
    "statusBarItem.remoteBackground": palette.verdeMexicano,
    "statusBarItem.remoteForeground": palette.white,
    
    // Title bar colors
    "titleBar.activeBackground": palette.nightSky,
    "titleBar.activeForeground": palette.textSecondary,
    "titleBar.inactiveBackground": palette.nightSky,
    "titleBar.inactiveForeground": palette.textDark,
    "titleBar.border": palette.nightSkyLight,
    
    // Menu colors
    "menu.background": palette.nightSky,
    "menu.foreground": palette.textSecondary,
    "menu.selectionBackground": palette.nightSkyMedium,
    "menu.selectionForeground": palette.textPrimary,
    "menu.separatorBackground": palette.nightSkyMedium,
    "menubar.selectionBackground": palette.nightSkyMedium,
    "menubar.selectionForeground": palette.textPrimary,
    
    // Notification colors
    "notificationCenter.border": palette.nightSkyMedium,
    "notificationCenterHeader.background": palette.nightSky,
    "notificationCenterHeader.foreground": palette.textPrimary,
    "notifications.background": palette.nightSky,
    "notifications.foreground": palette.textSecondary,
    "notifications.border": palette.nightSkyMedium,
    "notificationToast.border": palette.nightSkyMedium,
    
    // Extensions
    "extensionButton.prominentBackground": palette.verdeMexicano,
    "extensionButton.prominentForeground": palette.white,
    "extensionButton.prominentHoverBackground": palette.verdeMexicanoLight,
    "extensionBadge.remoteBackground": palette.rosaMexicano,
    "extensionBadge.remoteForeground": palette.white,
    
    // Quick picker
    "pickerGroup.border": palette.nightSkyMedium,
    "pickerGroup.foreground": palette.textPrimary,
    "quickInput.background": palette.nightSky,
    "quickInput.foreground": palette.textSecondary,
    
    // Terminal colors
    "terminal.background": palette.nightSky,
    "terminal.foreground": palette.textPrimary,
    "terminal.ansiBlack": palette.nightSky,
    "terminal.ansiBlue": palette.info,
    "terminal.ansiCyan": palette.accentCyan,
    "terminal.ansiGreen": palette.verdeMexicano,
    "terminal.ansiMagenta": palette.rosaMexicano,
    "terminal.ansiRed": palette.error,
    "terminal.ansiWhite": palette.textPrimary,
    "terminal.ansiYellow": palette.neonYellow,
    "terminal.ansiBrightBlack": palette.textDark,
    "terminal.ansiBrightBlue": palette.neonBlue,
    "terminal.ansiBrightCyan": palette.accentCyan,
    "terminal.ansiBrightGreen": palette.verdeMexicanoLight,
    "terminal.ansiBrightMagenta": palette.rosaMexicanoLight,
    "terminal.ansiBrightRed": palette.error,
    "terminal.ansiBrightWhite": palette.white,
    "terminal.ansiBrightYellow": palette.neonYellow,
    "terminal.selectionBackground": palette.rosaMexicano + "30",
    "terminalCursor.background": palette.nightSkyLight,
    "terminalCursor.foreground": palette.rosaMexicano,
    
    // Git colors
    "gitDecoration.addedResourceForeground": palette.verdeMexicano,
    "gitDecoration.modifiedResourceForeground": palette.neonBlue,
    "gitDecoration.deletedResourceForeground": palette.error,
    "gitDecoration.untrackedResourceForeground": palette.verdeMexicanoLight,
    "gitDecoration.ignoredResourceForeground": palette.textDark,
    "gitDecoration.conflictingResourceForeground": palette.neonOrange,
    "gitDecoration.submoduleResourceForeground": palette.neonPurple,
    
    // Merge colors
    "merge.currentHeaderBackground": palette.verdeMexicano + "40",
    "merge.currentContentBackground": palette.verdeMexicano + "20",
    "merge.incomingHeaderBackground": palette.info + "40",
    "merge.incomingContentBackground": palette.info + "20",
    
    // Debug colors
    "debugToolBar.background": palette.nightSky,
    "debugToolBar.border": palette.nightSkyMedium,
    "editor.stackFrameHighlightBackground": palette.neonYellow + "20",
    "editor.focusedStackFrameHighlightBackground": palette.neonYellow + "30",
    
    // Peek view
    "peekView.border": palette.rosaMexicano,
    "peekViewEditor.background": palette.nightSky,
    "peekViewEditorGutter.background": palette.nightSky,
    "peekViewEditor.matchHighlightBackground": palette.verdeMexicano + "40",
    "peekViewResult.background": palette.nightSky,
    "peekViewResult.fileForeground": palette.textPrimary,
    "peekViewResult.lineForeground": palette.textSecondary,
    "peekViewResult.matchHighlightBackground": palette.verdeMexicano + "40",
    "peekViewResult.selectionBackground": palette.nightSkyMedium,
    "peekViewResult.selectionForeground": palette.textPrimary,
    "peekViewTitle.background": palette.nightSky,
    "peekViewTitleDescription.foreground": palette.textMuted,
    "peekViewTitleLabel.foreground": palette.textPrimary,
    
    // Breadcrumb
    "breadcrumb.foreground": palette.textMuted,
    "breadcrumb.background": palette.nightSkyLight,
    "breadcrumb.focusForeground": palette.textPrimary,
    "breadcrumb.activeSelectionForeground": palette.rosaMexicano,
    "breadcrumbPicker.background": palette.nightSky,
    
    // Welcome page
    "welcomePage.background": palette.nightSkyLight,
    "welcomePage.buttonBackground": palette.nightSkyMedium,
    "welcomePage.buttonHoverBackground": palette.nightSkyBright,
    
    // Settings
    "settings.headerForeground": palette.textPrimary,
    "settings.modifiedItemIndicator": palette.rosaMexicano,
    "settings.dropdownBackground": palette.nightSky,
    "settings.dropdownForeground": palette.textSecondary,
    "settings.dropdownBorder": palette.nightSkyMedium,
    "settings.checkboxBackground": palette.nightSky,
    "settings.checkboxForeground": palette.textSecondary,
    "settings.checkboxBorder": palette.nightSkyMedium,
    "settings.textInputBackground": palette.nightSky,
    "settings.textInputForeground": palette.textPrimary,
    "settings.textInputBorder": palette.nightSkyMedium,
    "settings.numberInputBackground": palette.nightSky,
    "settings.numberInputForeground": palette.textPrimary,
    "settings.numberInputBorder": palette.nightSkyMedium,
    
    // Minimap
    "minimap.findMatchHighlight": palette.verdeMexicano,
    "minimap.selectionHighlight": palette.rosaMexicano,
    "minimap.errorHighlight": palette.error,
    "minimap.warningHighlight": palette.warning,
    "minimap.background": palette.nightSkyLight,
    "minimapSlider.background": palette.textDark + "30",
    "minimapSlider.hoverBackground": palette.textDark + "50",
    "minimapSlider.activeBackground": palette.textDark + "60",
    "minimapGutter.addedBackground": palette.verdeMexicano,
    "minimapGutter.modifiedBackground": palette.neonBlue,
    "minimapGutter.deletedBackground": palette.error,
    
    // Bracket pair colorization
    "editorBracketHighlight.foreground1": palette.rosaMexicano,
    "editorBracketHighlight.foreground2": palette.verdeMexicanoLight,
    "editorBracketHighlight.foreground3": palette.neonBlue,
    "editorBracketHighlight.foreground4": palette.neonYellow,
    "editorBracketHighlight.foreground5": palette.accentMagenta,
    "editorBracketHighlight.foreground6": palette.accentCyan,
    "editorBracketHighlight.unexpectedBracket.foreground": palette.error,
    
    // Bracket pair guides
    "editorBracketPairGuide.activeBackground1": palette.rosaMexicano,
    "editorBracketPairGuide.activeBackground2": palette.verdeMexicanoLight,
    "editorBracketPairGuide.activeBackground3": palette.neonBlue,
    "editorBracketPairGuide.activeBackground4": palette.neonYellow,
    "editorBracketPairGuide.activeBackground5": palette.accentMagenta,
    "editorBracketPairGuide.activeBackground6": palette.accentCyan,
    "editorBracketPairGuide.background1": palette.rosaMexicano + "40",
    "editorBracketPairGuide.background2": palette.verdeMexicanoLight + "40",
    "editorBracketPairGuide.background3": palette.neonBlue + "40",
    "editorBracketPairGuide.background4": palette.neonYellow + "40",
    "editorBracketPairGuide.background5": palette.accentMagenta + "40",
    "editorBracketPairGuide.background6": palette.accentCyan + "40"
  };
}

module.exports = { getUIColors };