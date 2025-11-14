export const createErrorMessage = (data: any) => {
  if (!data) return "Unable to complete request, something went wrong";

  // ✅ Common top-level message formats
  if (data.error) return data.error;
  if (data.message) return data.message;
  if (data.detail) return data.detail;
  if (data.title) return data.title;

  // ✅ Handle ASP.NET style validation error object
  if (data.errors && typeof data.errors === "object") {
    const messages: string[] = [];

    for (const key in data.errors) {
      if (Array.isArray(data.errors[key])) {
        messages.push(`${key}: ${data.errors[key].join(", ")}`);
      } else {
        messages.push(`${key}: ${data.errors[key]}`);
      }
    }

    if (messages.length > 0) {
      return messages.join(" | ");
    }
  }

  // ✅ Handle array or generic object
  if (Array.isArray(data)) {
    return data.join(", ");
  }

  if (typeof data === "object" && data !== null) {
    const parts = Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    return parts || "Unknown error occurred";
  }

  return "Unable to complete request, something went wrong";
};
