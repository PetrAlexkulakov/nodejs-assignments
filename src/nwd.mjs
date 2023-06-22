export const navigateUp = (currentDirectory) => {
    const parentDirectory = currentDirectory.replace(/[\\\/][^\\\/]+$/, '');
    if (parentDirectory !== currentDirectory && parentDirectory !== '') {
        return parentDirectory;
    }
    return currentDirectory;
}