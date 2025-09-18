
export async function getAvatar() {
    const avatarUrl = await fetch('https://avatar.iran.liara.run/public/boy');
    return avatarUrl;
}