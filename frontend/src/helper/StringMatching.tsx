export const getSimilarityScore = (input: string, title: string) => {
    const inputLower = input.toLowerCase();
    const titleLower = title.toLowerCase();
    if (titleLower.startsWith(inputLower)) return 3; // Perfect match at the start
    if (titleLower.includes(inputLower)) return 2;   // Contains the search input
    return 1; // No match
};
