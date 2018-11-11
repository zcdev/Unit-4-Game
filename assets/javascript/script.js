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

    // When player clicks, computer display its picked number and compare against total egg numbers
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

        // Generate each egg number
        var i = 0;
        while (allEggNumbers.length < 4) {
            i++;
            var eggNumber = Math.floor(Math.random() * 12) + 1;
            if (eggNumber !== $("egg").eq(i).val()) {
            if (!allEggNumbers.includes(eggNumber) ) {
                allEggNumbers.push(eggNumber);
            }
        }
        }

        // Assign each egg number to its value
        $(".egg").each(function (index) {
            $(this).val(allEggNumbers[index]);
            $("#computer-pick").text(computerPick);
        });
    }

});