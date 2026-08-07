const input = document.getElementById('command-input');
const output = document.getElementById('terminal-output');

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = input.value;
        if (command.trim() === '') return;

        appendLine(command, 'command-echo');
        input.value = '';

        fetch('/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command: command })
        })
        .then(response => response.json())
        .then(data => {
            if (data.output) {
                appendLine(data.output);
            }
            if (data.error) {
                appendLine(data.error, 'error');
            }
            output.scrollTop = output.scrollHeight;
        })
        .catch(error => {
            appendLine('Error: ' + error, 'error');
        });
    }
});

function appendLine(text, className = '') {
    const div = document.createElement('div');
    div.className = 'line ' + className;
    div.textContent = className === 'command-echo' ? '$ ' + text : text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}
