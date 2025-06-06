# Common library of miscellaneous items for all sprites in this project.
# Not a valid sprite by iself.



################################
#         Math - misc          #
################################

# Get the sign of a number. 1 if positive, -1 if negative. NaN if 0.
%define SIGN(VAL) ((VAL)/abs(VAL))

# Power
%define POW(BASE,EXP) antiln(ln(BASE)*(EXP))

# nth root
%define ROOT(BASE,R) antiln(ln(BASE)/(R))

# Logarithm of any base
%define LOG(VAL,BASE) (ln(VAL)/ln(BASE))



# Smallest of 2 numbers
%define MIN(A,B) ((A)+(((A)>(B))*((B)-(A))))

# Largest of 2 numbers
%define MAX(A,B) ((A)+(((A)<(B))*((B)-(A))))



# Clamp, keep numbers above 0
%define POSITIVE_CLAMP(VAL) (((VAL)>0)*(VAL))

# Clamp between 0 and 1
%define CLAMP_0_1(VAL) (1 - (((VAL)<1) * (1-POSITIVE_CLAMP(VAL))) )



# Arithmetic mean ("average") of 2 numbers
%define MEAN(A,B) (((A)+(B))/2)

# Linear interpolation ("lerp"). Remap a normalised value `t` (between 0 and 1) to a different interval.
%define LERP(OUT0,OUT1,T) ((OUT0)+(T)*((OUT1)-(OUT0)))

# Opposite of lerp. Gets normalised `t` from a mapped value of a given interval.
%define UNLERP(IN0,IN1,VAL) (((VAL)-(IN0))/((IN1)-(IN0)))

# Map a value from input interval to output interval.
%define REMAP(IN0,IN1,OUT0,OUT1,T) (LERP(OUT0,OUT1,UNLERP(IN0,IN1,T)))



################################
#     Math - coordinates       #
################################

# Convert 2D coordinates into list index, assumes ints that do not wrap
%define INDEX_FROM_2D_NOWRAP_INTS(X,Y,SIZE_X) (1 + (((SIZE_X)*(Y)) + (X)))

# Convert 2D coordinates into list index, assumes ints, wrapped
%define INDEX_FROM_2D_INTS(X,Y,SIZE_X,SIZE_Y) (1 + (((SIZE_X)*((Y)%(SIZE_Y))) + ((X)%(SIZE_X))))

# Convert 2D coordinates into list index, floored and wrapped
%define INDEX_FROM_2D(X,Y,SIZE_X,SIZE_Y) (1 + (((SIZE_X)*(floor(Y)%(SIZE_Y))) + (floor(X)%(SIZE_X))))



################################
#        Math - vectors        #
################################

# Length of a 2D vector
%define VEC2_LEN(VX,VY) sqrt((VX)*(VX) + (VY)*(VY))

# Length of a 3D vector
%define VEC3_LEN(VX,VY,VZ) sqrt((VX)*(VX) + (VY)*(VY) + (VZ)*(VZ))

# Vector angle in the XY plane. Note the addition of 0, used to fix a negative zero bug.
%define ATAN2(Y,X) (atan((Y)/((X)+0)) + 180*((X)<0))

# Dot product 2D
%define DOT_PRODUCT_2D(X1,Y1,X2,Y2) ((X1)*(X2) + (Y1)*(Y2))

# Dot product 3D
%define DOT_PRODUCT_3D(X1,Y1,Z1,X2,Y2,Z2) ((X1)*(X2) + (Y1)*(Y2) + (Z1)*(Z2))



################################
#         Math - color         #
################################

# Floored RGB channels to integer. Does not clamp.
%define COMBINE_RGB_CHANNELS(R,G,B) (65536*floor(255*(R)) + 256*floor(255*(G)) + floor(255*(B)))



