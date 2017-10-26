'use strict'

const Datastore = require('nedb');
const dataFiles = require('./dataFiles');

const dbArticles = dataFiles.dbArticles;
const dbArticleCategories = dataFiles.dbArticleCategories;

class ArticleCache {
    constructor(users, categories) {
        this.users = users;
        this.categories = categories;

        this.articles = [];
    }

    init() {
        let initArticles = (function() {
            let load = (function(resolve, reject) {
                console.log('Loading articles...');
                dbArticles.find({}, (function(err, recs) {
                    this.articles = recs;
                    recs.forEach(rec => {
                        rec.owner = this.users.find(rec.ownerId);
                    });
                    console.log('articles loaded');
                    resolve(this);
                }).bind(this));
            }).bind(this);

            return new Promise(load);
        }).bind(this);

        let initArticleCategories = (function() {
            let load = (function(resolve, reject) {
                console.log('Loading article categories...');
                dbArticleCategories.find({}, (function(err, recs) {
                    recs.forEach(rec => {
                        let article = this.find(rec.articleId);
                        let category = this.categories.find(rec.categoryId);
        
                        if (!article.categories) {
                            article.categories = [];
                        }
                        article.categories.push(category);
                    });
                    console.log('article categories loaded');
                    resolve(this);
                }).bind(this));
            }).bind(this);

            return new Promise(load);
        }).bind(this);

        return initArticles().then(() => initArticleCategories());
    }

    findAll() {
        return this.articles.slice();
    }

    find(id) {
        return this.articles.find(article => article._id === id);
    }
}

module.exports = {
    ArticleCache
};