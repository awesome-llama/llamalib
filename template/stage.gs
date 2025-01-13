costumes "costumes/xy-grid-plain.png";

on "reset shared vars" {
    # reset all misc vars used across the project
    cam_x = 0;
    cam_y = 0;
    cam_scale = 1;
}

onclick {
    broadcast "stage clicked";
}