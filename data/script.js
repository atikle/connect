/**
 * Retrieves a user's data object from the database.
 * @param {string} username - The username to look for.
 * @returns {object|null} The user object if found, otherwise null.
 */
function getUserData(username) {
    if (users[username]) {
        return users[username];
    } else {
        console.error(`User '${username}' not found.`);
        return null;
    }
}


// --- THIS IS HOW YOU USE IT ---

// 1. Get the data object for a specific user
const anuragData = getUserData('anurag_gautam');
const ananyaData = getUserData('ananya');
const adityaData = getUserData('aditya');

// 2. Now, use that data to populate any element you want
// Ensure the data was found before trying to use it
if (anuragData) {
    // Populate Anurag's main profile section
    document.getElementById('anurag-avatar').src = anuragData.avatarUrl;
    document.getElementById('anurag-name').textContent = anuragData.name;
    document.getElementById('anurag-username').textContent = anuragData.username;

    // Use Anurag's avatar again in a different spot
    document.getElementById('anurag-avatar-small').src = anuragData.avatarUrl;
    document.getElementById('anurag-name-small').textContent = anuragData.name;
    document.getElementById('anurag-username-small').textContent = anuragData.username;
}

if (ananyaData) {
    // Populate the "ananya" section with Ananya's data
    document.getElementById('ananya-avatar').src = ananyaData.avatarUrl;
    document.getElementById('ananya-name').textContent = ananyaData.name;
    document.getElementById('ananya-username').textContent = ananyaData.username;
}