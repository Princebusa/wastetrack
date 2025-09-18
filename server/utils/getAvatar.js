const randomName =  `${Math.floor(Math.random() * 1000)}`;

export async function getAvatar() {
    const avatarUrl = await fetch(`https://avatar-placeholder.iran.liara.run/?username=${randomName}`);
    return avatarUrl;
}