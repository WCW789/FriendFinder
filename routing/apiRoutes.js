let friendData = require("../app/data/friends");

module.exports = function (app) {

    console.log(friendData);

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
        console.log(req.body)
    });

    app.post("/api/friends", function (req, res) {
        friendData.push(req.body);

        console.log(friendData);

        let sumArray = [];
        let friendDiff = [];

        function getSum(total, num) {
            return total + num;
        }

        for (i = 0; i < friendData.length - 1; i++) {
            for (j = 0; j < friendData[i].scores.length; j++) {
                sumArray.push((Math.abs(friendData[friendData.length - 1].scores[j] - friendData[i].scores[j])))
            }
        }
        console.log("ZZZZ " + sumArray)

        for (let w = 0; w < sumArray.length; w += 10) {
            friendDiff.push(sumArray.slice(w, w + 10).reduce(getSum));
        }
        console.log(friendDiff);

        Array.prototype.min = function () {
            return Math.min.apply(null, this);
        };

        console.log(friendDiff.min())
        let minDiff = friendDiff.min();

        function findFriend(onePerson) {
            return onePerson == minDiff;
        }

        console.log(friendDiff.findIndex(findFriend))

        for (z = 0; z < friendDiff.length; z++) {
            if (friendDiff.findIndex(findFriend) === z) {
                console.log(friendData[z].name)
            }
        }

        res.json(req.body)
    });

}