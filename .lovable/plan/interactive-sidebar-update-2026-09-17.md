# Interactive Sidebar Update

## Goal
Keep the dashboard’s current appearance unchanged while applying the supplied sidebar content and interactions.

## Changes
- Move the sidebar into a reusable `dashboard-sidebar` component under the UI components folder.
- Preserve the existing sizes, spacing, colors, typography, rounded corners, desktop layout, and mobile drawer.
- Add expandable Projects, Team, and Customers sections with the supplied nested items.
- Add the workspace switcher with its three workspace choices and create-workspace row.
- Make Search open a command-style search panel, keep the Inbox badge and shortcuts, and update the header context when navigation changes.
- Retain the current responsive behavior and use the existing button component for controls.

## Validation
- Check the sidebar on desktop and mobile.
- Verify workspace selection, nested menus, navigation state, search opening/closing, and mobile drawer behavior.
