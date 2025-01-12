# For more info see: https://scratch.mit.edu/projects/934459716/

costumes 
"costumes/icon.svg" as "icon", 
"costumes/large.png" as "large",
"costumes/blank.svg" as "",
"costumes/blank.svg" as "@ascii/";

list PTE_font = file ```5x7 printable ASCII.txt```;

%define current_costume_char_index costume_number() + 5

onflag {
    hide;
    erase_all;
    set_pen_color "black";
    plainText -200, 135, 2, "Hello, world!";
    plainText -200, 110, 1, "This is a preview of the PTE.";
    plainText -200, 90, 1, "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    plainText -200, 80, 1, "abcdefghijklmnopqrstuvwxyz";
    plainText -200, 70, 1, "0123456789";

    wrappedText -200, 0, 1, "The font called \"5x7 printable ASCII\" supports all the printable ASCII characters with glyph dimensions of 5x7px. It's optimised to be visually as small as possible while still being legible. The code is also very simple, designed to be easily backpackable.", 100;
}

proc plainText x, y, size, text {
    set_pen_size $size;
    x_offset = $x;
    y_offset = $y;
    txt_i = 1;
    switch_costume "large";
    repeat length $text {
        switch_costume $text[txt_i];
        font_char_index = PTE_font[current_costume_char_index];
        switch_costume "large";
        font_i = 3 + font_char_index;
        repeat PTE_font[5 + font_char_index] {
            font_i += 4;
            goto 
                x_offset + $size * PTE_font[font_i + 1],
                y_offset + $size * PTE_font[font_i + 2];
            pen_down;
            repeat PTE_font[font_i] {
                font_i += 2;
                goto 
                    x_offset + $size * PTE_font[font_i + 1],
                    y_offset + $size * PTE_font[font_i + 2];
            }
            pen_up;
        }
        x_offset += $size * (2 + PTE_font[2 + font_char_index]);
        txt_i += 1;
    }
    switch_costume "icon";
}


proc wrappedText x, y, size, text, wrap_width {
    set_pen_size $size;
    x_offset = $x;
    y_offset = $y;
    txt_i = 1;
    switch_costume "large";
    repeat length $text {
        if $text[txt_i] == " " {
            # search for the next space to ensure the word fits in the line
            txt_j = txt_i + 1;
            future_x = (x_offset - $x) + $size * 5; # width of space added
            until $text[txt_j] == " " or txt_j > length($text) or future_x >= $wrap_width {
                txt_j += 1;
                switch_costume $text[txt_j];
                future_x += $size * (2 + PTE_font[2 + PTE_font[current_costume_char_index]]);
            }
            if future_x >= $wrap_width {
                x_offset = $x;
                y_offset -= $size * 10;
                txt_i += 1; # skip the space as it was used to go to the next line
            }
        }

        switch_costume $text[txt_i];
        font_char_index = PTE_font[current_costume_char_index];
        switch_costume "large";
        font_i = 3 + font_char_index;
        repeat PTE_font[5 + font_char_index] {
            font_i += 4;
            goto 
                x_offset + $size * PTE_font[font_i + 1],
                y_offset + $size * PTE_font[font_i + 2];
            pen_down;
            repeat PTE_font[font_i] {
                font_i += 2;
                goto 
                    x_offset + $size * PTE_font[font_i + 1],
                    y_offset + $size * PTE_font[font_i + 2];
            }
            pen_up;
        }
        x_offset += $size * (2 + PTE_font[2 + font_char_index]);
        txt_i += 1;
    }
    switch_costume "icon";
}


