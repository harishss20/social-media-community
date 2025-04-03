export const getRandomCommunity = async () => {
    return fetch(`http://localhost:8000/api/join-community/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        }
    })
        .then((res) => res.json())
        .then(({ data }) => {
            console.log(data);
            return data;
        })
        .catch(e => {
            return e.error;
        });
}

export const joinMultipleCommunities = async (arr) => {
    const id = localStorage.getItem("UserId");
    await Promise.all(arr.map(async (item) => {
        const res = fetch("http://localhost:8000/api/join-community/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify({ user_id: id, community_name: item }),
        })

        const data = (await res).json();
        console.log(data);
    }))
}