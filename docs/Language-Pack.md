# PALASH MITRA: Pluggable Language Pack Specification
## Integrating Low-Resource Tribal Languages (Santhali, Ho, Mundari)

---

## 1. Design Rationale
In multi-tribal districts across Jharkhand, language distribution varies sharply by block:
- **Santhal Pargana**: Santhali (*Ol Chiki*)
- **Kolhan Division (West Singhbhum)**: Ho (*Warang Chiti*)
- **Khunti & Ranchi**: Mundari & Kurukh

The core PALASH MITRA platform has zero hardcoded linguistic dependencies. Every language implements the `ILanguageProvider` contract.

---

## 2. Implementing a New Language Pack
To add a language (e.g. *Ho* or *Kurukh*):
1. **Define Provider**:
   ```typescript
   export class HoProvider implements ILanguageProvider {
     readonly code = 'hoc';
     readonly nameEnglish = 'Ho';
     readonly nameNative = 'ᱦᱳ / 𑢹𑣉';
     readonly nativeScript = 'Warang Chiti';
     readonly isLowResource = true;
     // ... methods
   }
   ```
2. **Provide Unicode Font Mapping**:
   - Register script CSS font family in `@font-face` or Google Fonts.
3. **Register in `LanguageRegistry`**:
   - `languageRegistry.register(new HoProvider());`
4. **Deploy Content Pack**:
   - Publish `pack-hoc-grade-1.json` containing grade-wise curriculum terms.

---

## 3. Ol Chiki Script Specifications (Santhali)
Ol Chiki is an authentic indigenous script invented by Pandit Raghunath Murmu in 1925 and recognized under the 8th Schedule of the Constitution of India.
- **Unicode Range**: `U+1C50` to `U+1C7F`
- **Digits 0 to 9**: `᱐ ᱑ ᱒ ᱓ ᱔ ᱕ ᱖ ᱗ ᱘ ᱙`
- **Letters**: `ᱚ ᱛ ᱜ ᱝ ᱞ ᱟ ᱠ ᱡ ᱢ ᱣ ᱤ ᱥ ᱦ ᱧ ᱨ ᱩ ᱪ ᱫ ᱬ ᱭ ᱮ ᱯ ᱰ ᱱ ᱲ ᱳ ᱴ ᱵ ᱶ ᱷ`
- **Punctuation**: `᱾` (Punctuation Single / Danda), `᱿` (Punctuation Double).
