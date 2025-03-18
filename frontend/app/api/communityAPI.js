

export const EditCommunityPage = async (id, name) => {
    return fetch(`http://localhost:8000/api/community?id=${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({ name: name })
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch(e => {
            return e.error;
        });
}

export const DeleteCommunityPage = async (id, name) => {
    return fetch(`http://localhost:8000/api/community?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({ name: name })
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch(e => {
            return e.error;
        });
}

export const searchCommunity = async (name) => {
    return fetch(`http://localhost:8000/api/community/search?name=${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({ name: name })
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch(e => {
            return e.error;
        });
}