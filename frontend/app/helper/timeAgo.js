export const timeAgo = (created) => {
    const currentTime = Date.now();
    const createdTime = new Date(created).getTime();

    let duration = (currentTime - createdTime) / (1000 * 60 * 60 * 24 * 365);
    if (duration >= 1) return Math.floor(duration) + " years ago";

    duration = (currentTime - createdTime) / (1000 * 60 * 60 * 24 * 30);
    if (duration >= 1) return Math.floor(duration) + " months ago";

    duration = (currentTime - createdTime) / (1000 * 60 * 60 * 24 * 7);
    if (duration >= 1) return Math.floor(duration) + " weeks ago";

    duration = (currentTime - createdTime) / (1000 * 60 * 60 * 24);
    if (duration >= 1) return Math.floor(duration) + " days ago";

    duration = (currentTime - createdTime) / (1000 * 60 * 60);
    if (duration >= 1) return Math.floor(duration) + " hours ago";

    return "Just now";
}