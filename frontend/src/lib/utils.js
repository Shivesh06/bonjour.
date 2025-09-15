export const capitalize = (input) => {
  if (Array.isArray(input)) {
    return input.map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()) 
  }
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase() 
} 