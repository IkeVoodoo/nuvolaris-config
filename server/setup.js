let db = undefined

async function store(coll, id, val) {
    let key = {}
    key[id] = val[id]
    console.log(coll, val)
    await db.collection(coll).updateOne(key, { $set: val }, { upsert: true })
}

module.exports = async function (_db) {
    db = _db
    await store("user", "iduser", {
        "role": 'Administrator',
        "name": 'Michele',
        "surname": 'Sciabarra',
        "address": 'via Terracini 28',
        "phone": '3926197994',
        "email": 'michele@sciabarra.com',
        "password": 'nuvola'
        })
        await store("user", "iduser", {
            "role": 'Administrator',
            "name": 'Mirella',
            "surname": 'Di Girolamo',
            "address": 'via Terracini 28',
            "phone": '3286480094',
            "email": 'mirella@sciabarra.com',
            "password": 'nuvola'
            })
    await store("user", "iduser", {
                "role": 'User',
                "name": 'Marco',
                "surname": 'Solo',
                "address": '',
                "phone": '',
                "email": 'info@sciabarra.com',
                "password": 'nuvola'
                })
    await store("namespace", "idnamespace", {
        "email": "info@sciabarra.com",
        "namespace":"alfabetagamma",
        })
    await store("namespace", "idnamespace", {
            "email": "info@sciabarra.com",
            "namespace":"deltaxiomicrom",
            })
    
}
