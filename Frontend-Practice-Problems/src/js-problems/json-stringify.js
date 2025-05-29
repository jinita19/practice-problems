export default function jsonStringify(value) {
    if (typeof value === "string") {
    //   return `"${value}"`;
        return `"${value.replace(/"/g, '\\"')}"`
    } else if (typeof value !== "object" || value === null) {
      return String(value);
    }
  
    if (Array.isArray(value)) {
      const arrayValues = value.map((item) => jsonStringify(item));
      return `[${arrayValues.join(",")}]`;
    }
  
    const objEntries = Object.entries(value).map(
      ([key, value]) => `"${key}":${jsonStringify(value)}`,
    );
  
    return `{${objEntries.join(",")}}`;
  }
  