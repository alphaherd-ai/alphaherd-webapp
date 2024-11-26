function capitalizeFirst(str:any) {
    if (!str) return str; // Check for empty string
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default capitalizeFirst;