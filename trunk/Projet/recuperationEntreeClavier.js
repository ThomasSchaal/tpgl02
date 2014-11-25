function ask(question, format, callback) {
    var stdin = process.stdin, stdout = process.stdout;
    stdin.resume();
    stdout.write(question + ": ");
    stdin.once('data', function(data) {
        data = data.toString().trim();
        if (format.test(data)) {
            callback(data);
        } else {
            stdout.write("Format incorect, celui ci doit être sous la forme: " + format + "\n");
            ask(question, format, callback);
        }
    });
}