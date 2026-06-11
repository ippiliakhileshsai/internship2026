// Quiz data: 6 levels × 5 questions about Light science
export const quizData = {
  1: {
    topic: "Sources of Light",
    questions: [
      {
        q: "Which of the following is a NATURAL source of light?",
        options: ["Bulb", "Candle", "Sun", "Torch"],
        answer: 2,
        explanation: "The Sun is a natural source of light. It produces its own light."
      },
      {
        q: "Objects that produce their own light are called:",
        options: ["Opaque objects", "Luminous objects", "Translucent objects", "Reflected objects"],
        answer: 1,
        explanation: "Luminous objects produce their own light, like the Sun, stars, and fire."
      },
      {
        q: "A moon shines because it:",
        options: ["Produces its own light", "Reflects sunlight", "Absorbs starlight", "Generates heat"],
        answer: 1,
        explanation: "The Moon is a non-luminous object. It reflects sunlight to appear bright."
      },
      {
        q: "Which of these is an ARTIFICIAL source of light?",
        options: ["Star", "Firefly", "Electric Bulb", "Sun"],
        answer: 2,
        explanation: "An electric bulb is an artificial (man-made) source of light."
      },
      {
        q: "Which best describes a non-luminous object?",
        options: [
          "It produces its own light",
          "It is always transparent",
          "It does not produce its own light",
          "It absorbs all light"
        ],
        answer: 2,
        explanation: "Non-luminous objects do not produce light; they reflect light from other sources."
      }
    ]
  },
  2: {
    topic: "Rays & Propagation",
    questions: [
      {
        q: "Light travels in a:",
        options: ["Curved path", "Zigzag path", "Straight line", "Circular path"],
        answer: 2,
        explanation: "Light travels in straight lines — this is called rectilinear propagation of light."
      },
      {
        q: "What is the speed of light in a vacuum?",
        options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"],
        answer: 1,
        explanation: "Light travels at approximately 3 × 10⁸ metres per second in a vacuum."
      },
      {
        q: "A shadow forms because light:",
        options: [
          "Bends around objects",
          "Cannot pass through opaque objects",
          "Is absorbed by transparent objects",
          "Slows down near objects"
        ],
        answer: 1,
        explanation: "Shadows form when light is blocked by opaque objects that light cannot pass through."
      },
      {
        q: "Which material allows all light to pass through it?",
        options: ["Opaque", "Translucent", "Transparent", "Reflective"],
        answer: 2,
        explanation: "Transparent materials (like glass) allow all light to pass through clearly."
      },
      {
        q: "A pinhole camera works on which principle?",
        options: [
          "Reflection of light",
          "Refraction of light",
          "Rectilinear propagation of light",
          "Dispersion of light"
        ],
        answer: 2,
        explanation: "A pinhole camera works on rectilinear propagation — light travels in straight lines."
      }
    ]
  },
  3: {
    topic: "Reflection of Light",
    questions: [
      {
        q: "The angle of incidence is ALWAYS equal to the:",
        options: [
          "Angle of refraction",
          "Angle of reflection",
          "Angle of dispersion",
          "Angle of diffraction"
        ],
        answer: 1,
        explanation: "First Law of Reflection: The angle of incidence equals the angle of reflection."
      },
      {
        q: "The incident ray, reflected ray, and normal all lie in the:",
        options: [
          "Different planes",
          "Same plane",
          "Perpendicular planes",
          "Parallel planes"
        ],
        answer: 1,
        explanation: "Second Law of Reflection: All three lie in the same plane."
      },
      {
        q: "A plane mirror forms an image that is:",
        options: [
          "Real and inverted",
          "Virtual and magnified",
          "Virtual and same size",
          "Real and same size"
        ],
        answer: 2,
        explanation: "A plane mirror forms a virtual, erect image of the same size as the object."
      },
      {
        q: "Which type of mirror is used in vehicle rear-view mirrors?",
        options: ["Concave mirror", "Plane mirror", "Convex mirror", "Parabolic mirror"],
        answer: 2,
        explanation: "Convex mirrors are used in rear-view mirrors as they give a wider field of view."
      },
      {
        q: "Regular reflection occurs on a:",
        options: ["Rough surface", "Smooth polished surface", "Translucent surface", "Coloured surface"],
        answer: 1,
        explanation: "Regular (specular) reflection occurs on smooth surfaces like mirrors."
      }
    ]
  },
  4: {
    topic: "Refraction of Light",
    questions: [
      {
        q: "Refraction is the bending of light when it passes from:",
        options: [
          "One colour to another",
          "One medium to another",
          "One source to another",
          "One shadow to another"
        ],
        answer: 1,
        explanation: "Refraction occurs when light passes from one medium to another (e.g., air to water)."
      },
      {
        q: "A straw appears bent in water because of:",
        options: ["Reflection", "Dispersion", "Refraction", "Diffraction"],
        answer: 2,
        explanation: "The straw appears bent due to refraction as light bends when moving between water and air."
      },
      {
        q: "When light goes from air to glass, it bends:",
        options: [
          "Away from the normal",
          "Towards the normal",
          "Parallel to the normal",
          "It does not bend"
        ],
        answer: 1,
        explanation: "When light enters a denser medium (glass), it bends towards the normal."
      },
      {
        q: "Real depth appears less than actual depth because of:",
        options: ["Reflection", "Dispersion", "Refraction", "Absorption"],
        answer: 2,
        explanation: "Refraction makes a pool appear shallower than it really is."
      },
      {
        q: "Snell's Law relates:",
        options: [
          "Angle of incidence and reflection",
          "Angle of incidence and refraction",
          "Speed and wavelength",
          "Colour and frequency"
        ],
        answer: 1,
        explanation: "Snell's Law: n₁ sin θ₁ = n₂ sin θ₂, relating angles of incidence and refraction."
      }
    ]
  },
  5: {
    topic: "Dispersion of Light",
    questions: [
      {
        q: "When white light passes through a prism, it splits into:",
        options: [
          "2 colours",
          "5 colours",
          "7 colours",
          "Infinite colours"
        ],
        answer: 2,
        explanation: "A prism disperses white light into 7 colours: VIBGYOR."
      },
      {
        q: "What does VIBGYOR stand for?",
        options: [
          "Violet, Indigo, Blue, Green, Yellow, Orange, Red",
          "Very Important Basic Growth Year Of Rainbow",
          "Violet, Indigo, Black, Green, Yellow, Orange, Red",
          "Visual, Infrared, Blue, Green, Yellow, Orange, Red"
        ],
        answer: 0,
        explanation: "VIBGYOR: Violet, Indigo, Blue, Green, Yellow, Orange, Red — the spectrum colours."
      },
      {
        q: "Which colour of light has the LONGEST wavelength?",
        options: ["Violet", "Blue", "Green", "Red"],
        answer: 3,
        explanation: "Red light has the longest wavelength (~700 nm) in the visible spectrum."
      },
      {
        q: "A rainbow is formed due to:",
        options: [
          "Only reflection in water droplets",
          "Only refraction in water droplets",
          "Dispersion and reflection in water droplets",
          "Absorption of sunlight"
        ],
        answer: 2,
        explanation: "A rainbow is caused by dispersion, refraction, and internal reflection in water droplets."
      },
      {
        q: "Which colour bends the MOST when light passes through a prism?",
        options: ["Red", "Green", "Yellow", "Violet"],
        answer: 3,
        explanation: "Violet light has the shortest wavelength and bends the most through a prism."
      }
    ]
  },
  6: {
    topic: "Light Energy",
    questions: [
      {
        q: "Which device converts sunlight directly into electrical energy?",
        options: [
          "Solar heater",
          "Solar cell (photovoltaic cell)",
          "Windmill",
          "Hydroelectric generator"
        ],
        answer: 1,
        explanation: "Solar cells (photovoltaic cells) convert sunlight directly into electrical energy."
      },
      {
        q: "Plants use light energy in the process of:",
        options: ["Respiration", "Transpiration", "Photosynthesis", "Digestion"],
        answer: 2,
        explanation: "Plants use sunlight in photosynthesis to convert CO₂ and water into food and oxygen."
      },
      {
        q: "Light energy travels as:",
        options: [
          "Sound waves",
          "Mechanical waves",
          "Electromagnetic waves",
          "Seismic waves"
        ],
        answer: 2,
        explanation: "Light is a form of electromagnetic radiation that can travel through vacuum."
      },
      {
        q: "The particle of light is called a:",
        options: ["Neutron", "Photon", "Electron", "Proton"],
        answer: 1,
        explanation: "A photon is the fundamental particle (quantum) of light and electromagnetic radiation."
      },
      {
        q: "UV (ultraviolet) rays from the Sun are harmful because:",
        options: [
          "They are visible",
          "They can cause skin burns and cancer",
          "They make things cold",
          "They have very long wavelengths"
        ],
        answer: 1,
        explanation: "UV rays carry high energy and prolonged exposure can cause skin damage and cancer."
      }
    ]
  }
};
