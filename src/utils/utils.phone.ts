import { parsePhoneNumberFromString } from 'libphonenumber-js';

class PhoneHelper {
    phoneSing(phone: any): string {
        const parsed = parsePhoneNumberFromString(phone, "UZ")
        return parsed?.isValid() ? parsed.number : null
    }
}


export default new PhoneHelper();

// export function normalizePhone(phone: string): string | null {
//     const parsed = parsePhoneNumberFromString(phone, 'UZ');
//     return parsed?.isValid() ? parsed.number : null;
// }

