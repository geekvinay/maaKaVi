/* eslint-disable @typescript-eslint/no-explicit-any */
import { Terminal } from "xterm";
import { useRef, useEffect } from "react";
import "xterm/css/xterm.css";
import SocketService from "../../services/SocketService/SocketService";

const TerminalComp = ({ socket }: { socket?: SocketService }) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const term = new Terminal();
    if (terminalRef.current) {
      term.open(terminalRef.current);
      term.write('Welcome to InBrowser IDE :)\n');
      term.write('\r\n$ ');

      socket?.io.on('output', (data) => {
        term.write(data);
      });

      term.onData((data) => {
        switch (data) {
          case '\r': // If Enter
            socket?.io.emit('input', data);
            term.write('\r\n$ '); // Show prompt again
            break;
          case '\u007F': // If Backspace (DEL)
            if (term.buffer.active.cursorX > 2) { // Prevent deletion of the prompt
              term.write('\b \b');
            }
            break;
          default: // Print all other characters
            term.write(data);
        }
      });
    }

    return () => {
      term.dispose();
    };
  }, [socket]);

  return (
    <section className="terminal-parent flex-grow rounded-lg">
      <div ref={terminalRef} className="terminal bg-red-50 base-bg block rounded-b-lg" />
    </section>
  );
};

export default TerminalComp;
