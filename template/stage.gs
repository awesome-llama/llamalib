%include common/common.gs

costumes "costumes/xy-grid-plain.png";


on "initalise" {
    # reset all global vars used across the project
    cam_x = 0;
    cam_y = 0;
    cam_scale = 1;
}

on "hard reset" {

}

onflag {
    broadcast "initalise"; # must complete within the frame, no starting loops. Think of it as a soft reset.
    broadcast "start main loop";
}

onclick {
    broadcast "stage clicked";
}