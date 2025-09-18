

export async function getAvatar() {

    const random = Math.floor(Math.random() * 50) + 1
    const avatarUrl = await fetch(`https://avatar.iran.liara.run/public/${random}`);
    return avatarUrl
}