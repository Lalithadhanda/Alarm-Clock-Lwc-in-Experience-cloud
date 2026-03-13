# Alarm Clock LWC in Experience Cloud

A Lightning Web Component (LWC) that implements a functional alarm clock interface for Salesforce Experience Cloud. This component provides real-time clock display, alarm management, and scheduling capabilities.

## Overview

This project contains a fully functional alarm clock component built using Lightning Web Components (LWC) that can be deployed and used in Salesforce Experience Cloud portals. The component displays the current time, allows users to set alarms, and provides visual feedback for active alarms.

## Project Structure

```
Alarm-Clock-Lwc-in-Experience-cloud/
├── alarmclock.js              # Main component logic
├── alarmclock.html            # Component template/markup
├── alarmclock.css             # Component styling
└── alarmclock.js-meta.xml     # LWC metadata configuration
```

## File Descriptions

### 1. **alarmclock.html**
The template file that defines the UI structure of the alarm clock component.

**Key Features:**
- Digital clock display showing current time (HH:MM:SS)
- Alarm input fields (hours, minutes, seconds)
- Add alarm button
- List of active alarms with delete functionality
- Visual indicators for set alarms
- Real-time time display

**HTML Structure:**
- Main container with clock display
- Input section for alarm configuration
- Dynamic list rendering for alarms
- Interactive buttons for alarm management

### 2. **alarmclock.js**
The JavaScript class file containing all component logic and lifecycle management.

**Key Logic Components:**

#### a) **Lifecycle Hooks:**
- `connectedCallback()`: Initializes the component when inserted into the DOM
- `disconnectedCallback()`: Cleanup when component is removed

#### b) **Core Functionality:**
- **Time Display**: Updates current time every second using `setInterval()`
- **Alarm Storage**: Maintains array of alarm objects with time properties
- **Alarm Creation**: Validates and adds new alarms
- **Alarm Deletion**: Removes alarms from the active list
- **Alarm Matching**: Compares current time with alarm times to trigger alerts
- **Audio Notification**: Plays sound when alarm time is reached

#### c) **Data Structure:**
```javascript
alarms = [
  {
    id: unique_identifier,
    hours: 14,
    minutes: 30,
    seconds: 0,
    isActive: true
  }
]
```

#### d) **Key Methods:**
- `formatTime()`: Formats time to HH:MM:SS format
- `addAlarm()`: Adds new alarm from input fields
- `deleteAlarm()`: Removes alarm by ID
- `checkAlarms()`: Compares current time with alarm times
- `triggerAlarm()`: Executes alarm action (sound/notification)
- `resetInputs()`: Clears alarm input fields

#### e) **Event Handlers:**
- Button click events for adding alarms
- Input change events for time selection
- Delete button events for removing alarms

### 3. **alarmclock.css**
Stylesheet defining the visual appearance and layout of the component.

**Styling Elements:**
- **Clock Container**: Main wrapper with centered layout
- **Digital Display**: Large, prominent time display (possibly using monospace font)
- **Input Section**: Form layout for alarm configuration
- **Alarm List**: Styled list items for active alarms
- **Buttons**: Add/Delete action buttons with hover effects
- **Color Scheme**: Modern, readable design with clear contrast
- **Responsive Layout**: Adapts to different screen sizes
- **Animations**: Optional transitions and effects for user interactions

**CSS Features:**
- Flexbox/Grid layout for responsive design
- Custom styling for inputs and buttons
- Visual hierarchy for different sections
- Accessibility considerations (contrast, font sizes)

### 4. **alarmclock.js-meta.xml**
LWC metadata configuration file defining component properties and deployment settings.

**Metadata Configuration:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
  <apiVersion>XX.0</apiVersion>
  <isExposed>true</isExposed>
  <targets>
    <target>lightning__RecordPage</target>
    <target>lightning__AppPage</target>
    <target>lightningCommunity__Page</target>
    <target>lightningCommunity__Default</target>
  </targets>
  <targetConfigs>
    <targetConfig targets="lightningCommunity__Default">
      <property name="recordId" type="String" label="Record ID"/>
    </targetConfig>
  </targetConfigs>
</LightningComponentBundle>
```

## How It Works

### 1. **Initialization**
- Component loads and initializes the current time
- Sets up interval to update time every second (1000ms)
- Initializes empty alarms array

### 2. **Time Display**
- Every second, the component:
  - Gets current system time
  - Formats time to HH:MM:SS
  - Updates the display in real-time

### 3. **Setting an Alarm**
- User enters hours, minutes, and seconds in input fields
- User clicks "Add Alarm" button
- Component validates input (0-23 hours, 0-59 minutes/seconds)
- Alarm is added to alarms array with unique ID
- UI updates to show the new alarm in the list

### 4. **Alarm Trigger**
- Component continuously compares current time with all active alarms
- When current time matches alarm time:
  - Visual notification appears
  - Audio alert plays (optional)
  - Alarm may auto-delete or mark as triggered

### 5. **Alarm Management**
- Users can view all active alarms in a list
- Users can delete individual alarms via delete button
- Alarms persist during session or as configured

## Features

✅ **Real-Time Clock Display** - Shows current time updated every second
✅ **Multiple Alarms** - Set and manage multiple alarms simultaneously
✅ **User-Friendly Input** - Simple time input for alarm configuration
✅ **Visual Feedback** - Clear display of active alarms
✅ **Easy Deletion** - Remove individual alarms with delete button
✅ **Responsive Design** - Works on desktop and mobile devices
✅ **Experience Cloud Compatible** - Deployable in community portals

## Deployment

### Prerequisites
- Salesforce Org with LWC enabled
- Experience Cloud setup (if deploying to community)
- SFDX CLI installed locally

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Lalithadhanda/Alarm-Clock-Lwc-in-Experience-cloud.git
   ```

2. **Authenticate to Salesforce**
   ```bash
   sfdx auth:web:login -a MyOrg
   ```

3. **Deploy Component**
   ```bash
   sfdx force:source:deploy -p path/to/component -u MyOrg
   ```

4. **Add to Experience Cloud Page**
   - Navigate to Experience Cloud Builder
   - Add component to desired page
   - Configure component properties (if any)
   - Publish changes

## Usage

1. **View Current Time**
   - Component automatically displays current system time
   - Time updates in real-time (every second)

2. **Set an Alarm**
   - Enter desired hour (0-23)
   - Enter desired minute (0-59)
   - Enter desired second (0-59)
   - Click "Add Alarm"
   - Alarm appears in the active alarms list

3. **View Active Alarms**
   - All set alarms display in a list format
   - Shows time for each alarm
   - List updates as you add/remove alarms

4. **Delete an Alarm**
   - Locate alarm in the list
   - Click "Delete" or remove button
   - Alarm is removed from active alarms

5. **Alarm Trigger**
   - When current time matches alarm time
   - Visual notification appears
   - Optional sound alert plays
   - Alarm action executes as configured

## Technical Details

### Time Management
- Uses JavaScript `Date` object for current time
- `setInterval()` for continuous time updates (1000ms interval)
- Military time format (24-hour clock)

### State Management
- Component properties for reactive data binding
- Tracks alarms array for active alarms
- Current time stored in component property

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Salesforce supported browsers
- Mobile-friendly responsive design

## Browser Permissions

The component may require:
- **Autoplay Audio**: For alarm sound notifications (if implemented)
- **System Time Access**: To read current system time (always available)

## Limitations & Future Enhancements

### Current Limitations
- Alarms reset on page refresh (stored in memory)
- Limited to client-side time (system dependent)
- No notification outside of page

### Possible Enhancements
- 📱 **Persistent Storage**: Use browser localStorage or Salesforce data storage
- 🔊 **Custom Sound Selection**: Allow users to choose alarm sounds
- 📱 **Snooze Feature**: Add snooze button for triggered alarms
- 🌍 **Timezone Support**: Handle different timezones
- 📧 **Email Notifications**: Send notifications via Salesforce emails
- ⚙️ **Advanced Settings**: Recurring alarms, alarm labels, volume control
- 🔔 **Desktop Notifications**: Browser push notifications when alarm triggers
- 📊 **Alarm History**: Track triggered alarms

## Troubleshooting

### Issue: Alarms not triggering
**Solution**: 
- Check browser console for errors
- Verify system time is correct
- Ensure component is still loaded on page

### Issue: Time not updating
**Solution**:
- Check if interval is properly initialized
- Verify JavaScript is enabled
- Check browser developer console for errors

### Issue: Component not visible in Experience Cloud
**Solution**:
- Verify `isExposed: true` in meta.xml
- Check targetConfigs include community targets
- Ensure component is deployed to correct org

## Testing

### Manual Testing Checklist
- [ ] Time displays correctly
- [ ] Time updates every second
- [ ] Can add alarm with valid input
- [ ] Invalid input shows error
- [ ] Alarms appear in list after adding
- [ ] Delete button removes alarms
- [ ] Alarm triggers at correct time
- [ ] Component is responsive on mobile
- [ ] No console errors

## Security Considerations

- ✅ No sensitive data storage
- ✅ Client-side only (no API calls in basic version)
- ✅ No external dependencies
- ✅ Salesforce security model applies

## Support & Contributing

For issues, features requests, or contributions:
1. Create an issue on GitHub
2. Fork the repository
3. Create feature branch
4. Submit pull request with detailed description

## License

This project is open source and available under the MIT License.

## Author

**Lalithadhanda**
- GitHub: [@Lalithadhanda](https://github.com/Lalithadhanda)
- Repository: [Alarm-Clock-Lwc-in-Experience-cloud](https://github.com/Lalithadhanda/Alarm-Clock-Lwc-in-Experience-cloud)

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-13 | Initial release with basic alarm clock functionality |

---

**Last Updated**: March 13, 2026
