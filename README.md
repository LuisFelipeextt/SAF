# SAF - Stripe Auto Fill

[![Version](https://img.shields.io/badge/version-1.3.0-blue.svg)](https://github.com/GofMan5/saf-extension)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Chrome extension for automated testing of Stripe checkout forms. Supports card generation with Luhn validation, address/name management, and IP-based geolocation.

## Features

- Automatic form filling for Stripe checkout pages
- Card number generation with configurable Luhn validation
- BIN template support (6-19 digit cards)
- Address generation with IP-based geolocation
- Custom address and name management
- Multi-theme UI (Dark, Light, Galaxy, Sky, Underground)
- IP blocker for 3DS challenge detection
- Local data storage (no external servers)
- BIN history with quick access

## Installation

1. Clone the repository:
```bash
git clone https://github.com/GofMan5/saf-extension.git
```

2. Load extension in Chrome:
   - Navigate to `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the extension directory

3. Pin extension to toolbar for quick access

## Usage

### Basic Workflow

1. Navigate to Stripe checkout page
2. Open extension popup
3. Configure BIN template (optional)
4. Click "Fill Everything"

### Configuration

#### Luhn Validation
Toggle Luhn algorithm validation for generated card numbers. When enabled, all cards pass checksum validation.

#### Address Source
- `Static` - Use predefined addresses
- `Manual` - Use custom addresses from settings
- `Auto` - Generate random US addresses with realistic data

#### IP-Based Location (Auto mode only)
When enabled with Auto address mode, generates addresses based on detected IP geolocation. Uses `ip-api.com` for location detection.

#### Name Source
- `Static` - Use predefined names
- `Manual` - Use custom names from settings
- `Auto` - Generate names matching address data

### Data Management

The "Clear All Data" button removes:
- Cookies for stripe.com domains
- LocalStorage and SessionStorage
- IndexedDB entries
- Cache entries
- Service worker registrations

## Technical Details

### Card Generation Algorithm

- BIN template parsing with 'x' placeholder support
- Luhn checksum calculation using lookup table optimization
- Expiry date generation (1-60 months from current date)
- CVV generation (3-4 digits based on card type)
- Card type detection via BIN ranges (Visa, Mastercard, Amex, Discover, JCB, UnionPay, Diners, Maestro)
- Batch generation with uniqueness verification

### Address Generation

**Built-in datasets:**
- 50 US states with accurate ZIP code ranges
- 1000+ real US cities (20-40 per state)
- 100+ realistic street names with variations
- Multiple street types (Street, Avenue, Road, Drive, Lane, etc.)
- Address line 2 generation (apartments, suites, units)
- Weighted city selection for popular metropolitan areas

**IP Geolocation (optional):**
- Detects user location via IP address
- Maps region data to US state codes
- Falls back to random selection if detection fails
- Only active in Auto address mode

### Name Generation

- 100+ weighted male/female first names
- 100+ weighted last names
- Middle name support (70% probability)
- Gender-appropriate name selection
- Realistic distribution based on US census data

### IP Blocker

- Automatic 3DS challenge modal detection
- IP blocking on challenge detection
- Country information via ip-api.com
- Blocked IP history with timestamps
- Manual IP management interface

### Architecture

Manifest V3 extension with following structure:

```
├── manifest.json          # Extension manifest (v3)
├── popup.html/js         # Extension UI and logic
├── styles.css            # Multi-theme styling
├── background.js         # Service worker (card/address generation)
├── content.js            # Form detection and filling
├── dataGenerator.js      # Address/name generation algorithms
├── cursorRegistration.js # Cursor AI integration (dev)
└── translations.json     # i18n support (EN/RU)
```

**Key permissions:**
- `storage` - Local data persistence
- `activeTab` - Access to current Stripe page
- `scripting` - Content script injection
- `cookies` - Cookie management for data clearing
- `browsingData` - Cache/storage clearing

## Development

### Form Detection

Content script uses multiple detection strategies:
1. Shadow DOM traversal for nested elements
2. Autocomplete attribute matching
3. Name/ID attribute scoring
4. Placeholder and aria-label analysis
5. Field synonym matching with weighted scoring

### Data Storage

All data stored in `chrome.storage.local`:
- `currentBin` - Active BIN template
- `binHistory` - Recent BIN list (max 20)
- `customAddresses` - User addresses
- `customNames` - User names
- `addressSource` / `nameSource` - Generation mode
- `useIPLocation` - IP geolocation toggle
- `useLuhnValidation` - Luhn validation toggle
- `blockedIPs` - IP blocker data
- `theme` / `language` - UI preferences

## External Dependencies

The extension makes HTTPS requests to:
- `ipwho.is` - IP geolocation with CORS support (only when IP-based location is enabled in Auto mode)
- `api.ipify.org` - IP address detection (IP blocker feature)

All API calls use HTTPS for security. Card/address generation algorithms run locally.

## Compatibility

Requires Chromium-based browser with Manifest V3 support:
- Chrome 88+
- Edge 88+
- Brave 1.20+
- Opera 74+

## Limitations

- Only works on Stripe checkout pages
- IP geolocation limited to US addresses
- Form detection may fail on heavily customized checkout implementations
- Shadow DOM elements require specific detection logic

## Development Roadmap

- [x] Luhn validation algorithm
- [x] US address generation (50 states)
- [x] Name generation with demographics
- [x] IP-based geolocation
- [x] Multi-theme UI
- [x] IP blocker for 3DS
- [x] i18n support (EN/RU)
- [ ] Settings import/export
- [ ] Keyboard shortcuts
- [ ] Additional country support

## Disclaimer

**For testing purposes only.** This tool is designed for Stripe test mode and should only be used with test API keys and test payment methods. Never use with real payment credentials or production Stripe accounts.

## Changelog

### v1.3.0 (2024-11-10)
- IP-based address generation with geolocation
- Extended city database (1000+ real US cities)
- 3DS challenge detection and IP blocking
- Multi-theme support (5 themes)
- Bilingual interface (EN/RU)
- Name source configuration
- Improved form detection for nested elements
- Card accordion auto-selection
- Enhanced address accuracy with 20-40 cities per state

### v1.2.0
- Realistic name generation (demographics-based)
- Address generation for all 50 US states
- Initial city database (500+ cities)
- Weighted randomization for realistic data
- Custom name management

### v1.1.0
- Luhn validation with lookup table optimization
- BIN history (up to 20 entries)
- Custom address management
- Settings panel
- Data clearing functionality

### v1.0.0
- Initial release
- Basic card generation
- Static address support
- Dark theme UI

## License

MIT License - see [LICENSE](LICENSE) file

## Author

**Maksim Gofman**
- GitHub: [@GofMan5](https://github.com/GofMan5)
- Telegram: @GofMan5

## Contributing

Pull requests welcome. For major changes, open an issue first to discuss proposed changes.

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request
