import { parsePhoneNumberFromString } from 'libphonenumber-js';

export class PhoneHelper {
    phoneSing(phone: string): string | null {
        const parsed = parsePhoneNumberFromString(phone, "UZ")
        return parsed?.isValid() ? parsed.number : null
    }
}

// export function normalizePhone(phone: string): string | null {
//     const parsed = parsePhoneNumberFromString(phone, 'UZ');
//     return parsed?.isValid() ? parsed.number : null;
// }

