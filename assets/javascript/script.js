$(document).ready(function () {

    // Declare and assign variables
    var computerPick = Math.floor(19 + Math.random() * (120 + 1 - 19));
    var totalScore = 0;
    var wins = 0;
    var losses = 0;
    var allEggNumbers = [];
    var ding = new Audio('assets/dingding.mp3');

    // Starting the game
    resetGame();

    // When player clicks the egg, computer display its picked number and compare against total egg numbers
    $(".egg").on("click", function () {
        $("#computer-pick").text(computerPick);
        var eggValue = $(this).val();
        totalScore += parseInt(eggValue);
        $("#total-score").text(totalScore);
        $("#status").removeClass("animate");

        // If total egg number is equal to computer's picked number
        if (totalScore === computerPick) {
            wins++;
            $("#wins").text(wins);
            ding.play();
            $('#popMessage').modal('show');
            $("#status").text("Yay, you won!!!");
            if (!$("#status").hasClass("animate")) {
                $("#status").addClass("animate");
            }
            resetGame();

            // If total egg number is greater than computer's picked number
        } else if (totalScore > computerPick) {
            losses++;
            $("#losses").text(losses);
            $('#popMessage').modal('show');
            $("#status").text("Uh-oh, you lost!!!");
            resetGame();
        }
    });

    // Reset the game
    function resetGame() {
        $("#computer-pick").empty();
        computerPick = Math.floor(19 + Math.random() * (120 + 1 - 19));
        $("#computer-pick").text(computerPick);
        allEggNumbers = [];
        totalScore = 0;

        // Generate each unique egg number
        while (allEggNumbers.length < 4) {
            var eggNumber = Math.floor(Math.random() * 12) + 1;
            if (!allEggNumbers.includes(eggNumber)) {
                if (parseInt($(".egg").val()) !== eggNumber) {
                    allEggNumbers.push(eggNumber);
                }
            }

            // Assign each unique egg number to its value
            $(".egg").each(function (index) {
                $(this).val(allEggNumbers[index]);
                $("#computer-pick").text(computerPick);
            });
        }
    }

});