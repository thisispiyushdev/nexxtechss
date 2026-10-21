export const COUNTRY_CODES = [
  { code: "+91", country: "India", flag: "🇮🇳", digits: 10 },
  { code: "+1", country: "US / Canada", flag: "🇺🇸", digits: 10 },
  { code: "+44", country: "UK", flag: "🇬🇧", digits: 10 },
  { code: "+971", country: "UAE", flag: "🇦🇪", digits: 9 },
  { code: "+61", country: "Australia", flag: "🇦🇺", digits: 9 },
  { code: "+65", country: "Singapore", flag: "🇸🇬", digits: 8 },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦", digits: 9 },
  { code: "+974", country: "Qatar", flag: "🇶🇦", digits: 8 },
  { code: "+49", country: "Germany", flag: "🇩🇪", digits: 10 },
  { code: "+33", country: "France", flag: "🇫🇷", digits: 9 },
];

/**
 * Validates phone number strictly according to postal/country calling code
 */
export function validatePhone(phone, countryCode = "+91") {
  const digits = (phone || "").replace(/\D/g, "");
  const country = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  if (!digits) {
    return {
      isValid: false,
      error: "Phone number is required",
    };
  }

  if (digits.length < country.digits) {
    return {
      isValid: false,
      error: `Phone number cannot be less than ${country.digits} digits (${digits.length}/${country.digits})`,
    };
  }

  if (digits.length > country.digits) {
    return {
      isValid: false,
      error: `Phone number cannot be more than ${country.digits} digits`,
    };
  }

  return {
    isValid: true,
    cleanPhone: digits,
    fullPhone: `${country.code} ${digits}`,
  };
}

/**
 * PhoneInputWithCountry Component
 * Features:
 * - Country calling code dropdown (+91, +1, +44, etc.)
 * - Strict digit restriction: only numbers allowed
 * - Auto caps length to 10 digits (or country's exact length)
 * - Matching UI design with light/dark theme support
 */
export default function PhoneInputWithCountry({
  phone,
  onChangePhone,
  countryCode = "+91",
  onChangeCountryCode,
  error,
  label = "Phone Number",
  labelClassName = "",
  placeholder,
  required = true,
  className = "",
  inputClassName = "",
  containerClassName = "",
  id,
}) {
  const currentCountry =
    COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];
  const expectedDigits = currentCountry.digits;
  const defaultPlaceholder = `Enter ${expectedDigits}-digit mobile number`;

  const handlePhoneChange = (e) => {
    // Only numbers allowed, max capped by country digits
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, expectedDigits);
    onChangePhone(cleaned);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 ${labelClassName}`}
        >
          {label} {required && "*"}
        </label>
      )}
      <div className={`flex items-center rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#84CC16] transition-all w-full min-w-0 ${
        containerClassName || "border border-gray-200 dark:border-gray-700 bg-[#F9FAFB] dark:bg-[#0f1117] h-10 sm:h-11 focus-within:border-[#84CC16] focus-within:ring-[#84CC16]/20"
      }`}>
        {/* Country code selector */}
        <div className="flex items-center h-full pl-2.5 sm:pl-3 pr-1 py-1.5 sm:py-2 bg-gray-100/60 dark:bg-white/5 border-r border-gray-200/50 dark:border-gray-700/60 shrink-0">
          <select
            value={countryCode}
            onChange={(e) => onChangeCountryCode && onChangeCountryCode(e.target.value)}
            className="bg-transparent border-0 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 focus:outline-none cursor-pointer pr-1 max-w-[110px] sm:max-w-none"
            title="Country / Postal Calling Code"
          >
            {COUNTRY_CODES.map((c) => (
              <option
                key={c.code}
                value={c.code}
                className="bg-white dark:bg-[#1a1d27] text-gray-900 dark:text-white"
              >
                {c.flag} {c.code} ({c.country})
              </option>
            ))}
          </select>
        </div>

        {/* Numeric input */}
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={expectedDigits}
          value={phone}
          onChange={handlePhoneChange}
          placeholder={placeholder || defaultPlaceholder}
          className={`flex-1 min-w-0 bg-transparent border-0 px-3 sm:px-4 py-2 text-xs sm:text-sm text-[#111827] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 ${inputClassName}`}
        />
        {phone && (
          <span className="text-[10px] text-gray-400 dark:text-gray-500 pr-2.5 sm:pr-3 font-mono shrink-0">
            {phone.length}/{expectedDigits}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs font-medium mt-1">{error}</p>}
    </div>
  );
}
