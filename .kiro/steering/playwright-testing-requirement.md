# Playwright MCP Testing Requirement for Web Code

## Mandatory Playwright MCP Testing

**CRITICAL REQUIREMENT**: Whenever you generate HTML, CSS, or JavaScript code, you MUST always use the Playwright MCP to:

### Required MCP Actions

1. **Navigate to the HTML file** using `mcp_playwright_browser_navigate`
2. **Take a screenshot** using `mcp_playwright_browser_take_screenshot` for visual verification
3. **Check console messages** using `mcp_playwright_browser_console_messages` to log any errors or warnings
4. **Verify page snapshot** using `mcp_playwright_browser_snapshot` to ensure layout and accessibility
5. **Monitor network requests** using `mcp_playwright_browser_network_requests` to confirm CSS/JS files load correctly

### Implementation Requirements

- **Never skip Playwright MCP testing** - even for small HTML/CSS snippets
- **Always assume** the user wants to see and test the code visually before using it
- **Use the MCP tools directly** instead of creating separate test files
- **Provide visual feedback** through screenshots and console output

### MCP Testing Flow

After generating web code, always execute this sequence:

1. Navigate to the HTML file
2. Take a full-page screenshot
3. Check console messages for errors
4. Capture accessibility snapshot
5. Verify network requests completed successfully

### Exception Policy

**NO EXCEPTIONS**: This requirement applies to ALL web code generation, regardless of:
- Code complexity or size
- Whether it's a snippet or full application
- User's stated preferences
- Time constraints

The Playwright MCP testing is as important as the code itself and must always be executed.