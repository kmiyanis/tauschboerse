const bcrypt = require('bcrypt');

function resetData(dataCache) {
    const articles = [
        {ownerId: 0, title: 'Tisch', description: 'Antiker Tisch aus dem Jahr 1900', photos: [], categoryIds: [0]},
        {ownerId: 0, title: 'PC', description: 'Computer mit super Grafikkarte', photos: [], categoryIds: [1]},
        {ownerId: 0, title: 'Fussballschuhe', description: 'Fussballschuhe, fast neu...', photos: [], categoryIds: [2, 3]},
        {ownerId: 1, title: 'Kinderwagen', description: 'Kind ist schon zu gross dafür', photos: [], categoryIds: [4]},
    ];
    const categories = [
        {name: 'Möbel'},
        {name: 'Technik'},
        {name: 'Fussball'},
        {name: 'Sport'},
        {name: 'Kindersachen'}
    ];
    const offers = [
        { transactionId: 0, senderId: 0, receiverId: 1}
    ];
    const transactions = [
        { user1Id: 0, user2Id: 1}
    ];
    const users = [
        {email: 'christian.albiez@hsr.ch', name: 'Christian Albiez', password: bcrypt.hashSync('christian', 10), registration: new Date()},
        {email: 'stephen.atchison@hsr.ch', name: 'Stephen Atchison', password: bcrypt.hashSync('stephen', 10), registration: new Date()},
        {email: 'max@mustermann.com', name: 'Max Mustermann', password: bcrypt.hashSync('max', 10), registration: new Date()},
        {email: 'jamesbond007@agent.com', name: 'James Bond', password: bcrypt.hashSync('james', 10), registration: new Date()}
    ];

    function insertUsers() {
        console.log('inserting users...');
        return Promise.all(users.map(
            user => dataCache.saveUser(dataCache.prepareUser(user))
        ));
    }

    function insertCategories() {
        console.log('inserting categories...');
        return Promise.all(categories.map(
            category => dataCache.saveCategory(dataCache.prepareCategory(category))
        ));
    }

    function insertArticles() {
        console.log('inserting articles...');
        return Promise.all(articles.map(article => {
            article.owner = users[article.ownerId];
            article.categories = article.categoryIds.map(id => categories[id]);
            return dataCache.saveArticle(dataCache.prepareArticle(article));
        }));
    }

    function insertTransactions() {
        console.log('inserting transactions...');
        return Promise.all(transactions.map(transaction => {
            transaction.user1Id = users[transaction.user1Id]._id;
            transaction.user2Id = users[transaction.user2Id]._id;
            return dataCache.saveTransaction(dataCache.prepareTransaction(transaction));
        }));
    }

    function insertOffers() {
        console.log('inserting offers...');
    }

    return dataCache.clear()
        .then(() => insertUsers())
        .then(() => insertCategories())
        .then(() => insertArticles())
//        .then(() => insertTransactions())
//        .then(() => insertOffers())
    ;
}

module.exports = { resetData };
