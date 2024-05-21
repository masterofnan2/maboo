function fileIsImage(file: File) {

    const validImageTypes = [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/bmp',
        'image/svg+xml',
        'image/webp',     
        'image/avif'
    ];

    return validImageTypes.includes(file.type);
}

export default fileIsImage;