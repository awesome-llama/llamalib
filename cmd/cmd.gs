# For more info see: https://scratch.mit.edu/projects/1101066205/

costumes "costumes/icon_cmd.svg" as "icon";

list command; # internal storage of commands

proc _read_command_until_semicolon {
    # split a single command into its components
    delete command;
    inside_quotes = 0;
    substring = "";
    # ignore preceding spaces and slashes
    until not ("/" in cmd_string[i]) {
        i += 1;
        if i > length(cmd_string) {
            stop_this_script;
        }
    }
    until i > length(cmd_string) {
        if inside_quotes == 1 and cmd_string[i] == "\\" {
            # escaped within a string, always read next value as text
            str &= cmd_string[i+1];
            i += 2;
        } else {
            if cmd_string[i] == "\"" {
                inside_quotes = 1 - inside_quotes; 
            } elif inside_quotes == 0 and cmd_string[i] == " " {
                add substring to command;
                substring = "";
            } elif inside_quotes == 0 and cmd_string[i] == ";" {
                add substring to command;
                substring = "";
                stop_this_script; # end of command, break so it can be run
            } else {
                substring &= cmd_string[i];
            }
            i += 1;
        }
    } 
    add substring to command;
    substring = "";
}


proc evaluate_command {
    # evaluate the command stored in the command list
    command_name = command[1];
    if command_name[1] == "#" {
        stop_this_script;
    }
    delete command[1];
    
    if command_name == "dev" {
        dev = command[1];
        print "dev=" & dev, 4;
    } elif dev == 1 {
        if command_name == "reset" {

        } elif command_name == "help" {
            print "help", 4;

        } elif command_name == "broadcast" {
            broadcast command[1];

        } else {
            print "Unrecognised command: `" & command_name & "`", 4;

        }
    } else {
        print "dev=1 required", 4;
    }
}


proc print text, duration {
    # to be displayed with a text engine
    add $text to messages;
    if $duration == "" {
        add 4 to messages;
    } else {
        add $duration to messages;
    }
}

################################################################

onflag {
    hide;
    switch_costume "icon";
    delete command;
    substring = "";
    dev = 0;
    command_name = "";

    # example:
    cmd_string = "# This whole comment is safe to paste into the command input;   print \"this is an example\" 10;print \"of running multiple commands.\" 10;print \"> supports strings inside double quotes\" 10;print \"> special chars in strings are allowed... \\\";\" 10;print \"try running the following command: `print \"Hello, world!\"`\" 10;";
}


on "open commands" {
    hide;
    switch_costume "icon";
    ask "(DEV TOOLS) enter command:";
    if answer() != "" {
        cmd_string = answer();
        i = 1;
        until i >= length(cmd_string) {
            _read_command_until_semicolon;
            evaluate_command;
            i += 1;
        }
    }
}


onkey "/" {
    broadcast "open commands";
}


on "update cmd messages" {
    update_cmd_messages;
}

proc update_cmd_messages {
    # update only, not render
    msg_i = 1;
    repeat length(messages) / 2 {
        messages[msg_i+1] -= 0.033; # replace this with delta time
        if messages[msg_i+1] < 0 {
            # delete message
            delete messages[msg_i];
            delete messages[msg_i];
        } else {
            msg_i += 2;
        }
    }
}