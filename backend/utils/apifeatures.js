class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    //serach feature of api
    search() {
        //we want all the matching keywords, like if we have keyword samosa in query, so we want all keywords containing string samosa (example samosaomsa would also be getting serached)
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {}; //if keyword is there then search else return empty object

        this.query = this.query.find({ ...keyword });
        return this;
    }

    //filter functionality
    filter() {
        const queryCopy = { ...this.queryStr }; //copying query to queryCopy, used spready operator because when we directly assigned it this.queryStr it is passed as refenerence in JS, thus we used spread operator to make it a copy
        //removing some fields for category
        const removeFields = ["keyword", "limit", "page"];

        removeFields.forEach(key => delete queryCopy[key]); //delete keyword, limit and page from queryCopy

        //filtering for price, ratings, etc
        let queryStr = JSON.stringify(queryCopy);//converting to string, so as to replace the required fields
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);//replacing the fields with $ sign, so as to use it in mongoose

        this.query = this.query.find(JSON.parse(queryStr));//parsing the string to JSON and then finding the query
        return this;
    }

    //for pagination
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;//getting the current page

        const skip = resultPerPage * (currentPage - 1);//skiping the number of results

        this.query = this.query.limit(resultPerPage).skip(skip);//limiting the results and skipping the results

        return this;
    }
};

module.exports = ApiFeatures;