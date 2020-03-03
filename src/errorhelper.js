const ErrorHelper = () => {
    const _noDb = () => {
        return {msg: "problem with the db.json file. Check if the file is in dir data", code: 400}
    };

    const _emptyTable = (tableName) => {
        return {data: [], msg: `${tableName} is empty`, code: 200}
    };

    return {
        noDB: _noDb,
        emptyTable: _emptyTable
    }
};

module.exports = ErrorHelper();
