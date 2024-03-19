precision mediump float;
uniform float uScrollSpeed;
uniform sampler2D uSkellyTexture;
uniform float uTime;

uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;

uniform float uSineAmplitudePrimary;
uniform float uTimeScalePrimary;

uniform float uSineAmplitudeSecondary;
uniform float uTimeScaleSecondary;

varying vec2 vUv;

void main() {
    vec2 uvTransform1 = vec2(vUv.x - 0.01 * sin((uTime * uTimeScalePrimary) - (vUv.y * uSineAmplitudePrimary)) * 1.2, vUv.y);
    vec4 textureSample1 = texture2D(uSkellyTexture, uvTransform1);
    vec4 color1 = vec4(textureSample1.x * uColorPrimary.r, textureSample1.x * uColorPrimary.g, textureSample1.x * uColorPrimary.b, 1.);

    vec2 uvTransform2 = vec2(vUv.x + 0.01 * sin((uTime * uTimeScaleSecondary) - (vUv.y * uSineAmplitudeSecondary)) * 1.2, vUv.y);
    vec4 textureSample2 = texture2D(uSkellyTexture, uvTransform2);
    vec4 color2 = vec4(textureSample2.x * uColorSecondary.r, textureSample2.x * uColorSecondary.g, textureSample2.x * uColorSecondary.b, 1.0);

    vec4 colorOutput = color1 + color2;

    gl_FragColor = colorOutput;
}