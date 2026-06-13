// Quiz data: 6 levels × 5 questions about Light science
export const quizData = {
  1: {
    topic: "Sources of Light",
    questions: [
      {
        q: "Which of these things makes its own light naturally in nature?",
        options: ["A lightbulb", "A candle", "The Sun", "A flashlight"],
        answer: 2,
        explanation: "The Sun is a giant ball of burning gas that creates its own light. Things like bulbs and flashlights are made by humans (artificial), and the moon just bounces the sun's light."
      },
      {
        q: "What do we call things that create their very own light (like the Sun or a flashlight)?",
        options: ["Opaque objects", "Luminous objects", "Invisible objects", "Reflective objects"],
        answer: 1,
        explanation: "Luminous simply means 'giving off light'. If something can shine brightly in a pitch-black room all by itself, it is luminous!"
      },
      {
        q: "Why does the Moon look so bright at night?",
        options: ["It makes its own light", "It acts like a giant mirror bouncing sunlight", "It absorbs starlight", "It gets hot and glows"],
        answer: 1,
        explanation: "The Moon is actually like a giant grey rock! It doesn't glow on its own. It acts like a mirror, bouncing the light from the Sun down to us on Earth."
      },
      {
        q: "Which of these light sources was created by humans (artificial)?",
        options: ["A glowing star", "A firefly bug", "An electric lightbulb", "The Sun"],
        answer: 2,
        explanation: "Artificial means 'made by humans'. While the Sun, stars, and fireflies glow naturally, an electric bulb was invented and built by people in a factory."
      },
      {
        q: "What does it mean if an object is 'non-luminous'?",
        options: [
          "It produces its own light",
          "It is completely invisible",
          "It cannot make its own light",
          "It absorbs all light like a black hole"
        ],
        answer: 2,
        explanation: "If something is 'non-luminous', it means it cannot make its own light. To see a non-luminous object (like a table or a book), you need to shine a light on it from something else."
      }
    ]
  },
  2: {
    topic: "Rays & Propagation",
    questions: [
      {
        q: "If you shine a laser or a flashlight, how does the light beam travel?",
        options: ["In a curved bending line", "In a zig-zag line", "In a perfectly straight line", "In circles"],
        answer: 2,
        explanation: "Light is stubborn—it always travels in a perfectly straight line! It doesn't curve around corners or zigzag. That's why you can't see what's happening around a corner."
      },
      {
        q: "How fast does light travel when there's nothing in its way?",
        options: ["300 kilometers per second", "300,000 kilometers per second", "It travels instantly", "3,000 kilometers per second"],
        answer: 1,
        explanation: "Light is the fastest thing in the universe! It travels so incredibly fast (300,000 km per second) that it could zip around the entire Earth 7.5 times in just one single second."
      },
      {
        q: "Why does your body cast a dark shadow on a sunny day?",
        options: [
          "Because light bends around you",
          "Because your solid body blocks the straight light rays",
          "Because your body absorbs the heat",
          "Because the ground changes color"
        ],
        answer: 1,
        explanation: "Since light only travels in straight lines, when it hits something solid (like you), it gets completely blocked. The dark shape left behind on the ground where the light couldn't reach is your shadow!"
      },
      {
        q: "What do we call a material that lets you see perfectly straight through it, like a clear window?",
        options: ["Opaque", "Translucent", "Transparent", "Reflective"],
        answer: 2,
        explanation: "Transparent things, like perfectly clean glass or clear water, let almost all the light pass straight through them, which is why you can see right through them!"
      },
      {
        q: "Why does an image look upside-down when light passes through a tiny pinhole?",
        options: [
          "Because the hole flips the light",
          "Because gravity pulls the light down",
          "Because light only travels in straight diagonal lines",
          "Because the hole acts like a mirror"
        ],
        answer: 2,
        explanation: "Because light travels perfectly straight, the light coming from the top of a tree goes diagonally down through the hole, and light from the bottom goes diagonally up. This crosses the rays and creates an upside-down picture on the wall!"
      }
    ]
  },
  3: {
    topic: "Reflection of Light",
    questions: [
      {
        q: "When a beam of light bounces off a mirror, the angle it hits the mirror is exactly the same as:",
        options: [
          "The angle it bends inside the mirror",
          "The angle it bounces away from the mirror",
          "The size of the mirror",
          "The speed of the light"
        ],
        answer: 1,
        explanation: "Think of throwing a bouncy ball at a wall. If you throw it straight, it bounces straight back. If you throw it from the side at a sharp angle, it bounces away to the other side at that exact same angle! This is the Law of Reflection."
      },
      {
        q: "When light hits a mirror, the incoming beam, the bouncing beam, and the mirror all line up on:",
        options: [
          "Different 3D angles",
          "The exact same flat surface (plane)",
          "A curved surface",
          "A zigzag line"
        ],
        answer: 1,
        explanation: "If you were to draw the incoming light beam and the bouncing light beam on a flat piece of paper, they would both lie perfectly flat on that paper without sticking up into the air. They share the 'same plane'."
      },
      {
        q: "When you look into a normal, flat bathroom mirror, your reflection is:",
        options: [
          "Upside down",
          "Bigger than you are",
          "The exact same size as you are",
          "Smaller than you are"
        ],
        answer: 2,
        explanation: "A normal flat mirror doesn't shrink or stretch you. It shows you exactly the same size you really are! It is a 'virtual' image, meaning it looks like you are standing behind the glass, but you can't touch the image."
      },
      {
        q: "What kind of curved mirror is used on car side-mirrors to help drivers see more of the road?",
        options: ["A mirror that curves inward like a bowl", "A completely flat mirror", "A mirror that bulges outward like the back of a spoon", "A wavy mirror"],
        answer: 2,
        explanation: "Mirrors that bulge outward (Convex mirrors) shrink the reflection slightly. Making the cars look smaller allows the driver to fit a much wider view of the traffic behind them into a tiny mirror!"
      },
      {
        q: "To get a perfect, clear reflection like a shiny mirror, the surface needs to be:",
        options: ["Rough and bumpy", "Perfectly smooth and flat", "Made of plastic", "Painted black"],
        answer: 1,
        explanation: "If a surface is rough or bumpy, the light rays bounce off in a million different random directions, scattering the picture. A perfectly smooth surface bounces all the light together in the same direction to make a clear picture."
      }
    ]
  },
  4: {
    topic: "Refraction of Light",
    questions: [
      {
        q: "Why does light sometimes 'bend' or change direction?",
        options: [
          "Because it gets tired",
          "When it moves from one clear material (like air) into a thicker one (like water)",
          "When it hits a black wall",
          "Because of gravity pulling it down"
        ],
        answer: 1,
        explanation: "When light travels from thin air into thicker water or glass, it changes speed. This sudden change in speed causes the light beam to bend, almost like a shopping cart hitting a muddy puddle and swerving! This bending is called Refraction."
      },
      {
        q: "Why does a straight drinking straw look broken or bent when you put it in a glass of water?",
        options: ["Because the water breaks it", "Because of water pressure", "Because the light bending tricks your eyes (Refraction)", "Because the glass is curved"],
        answer: 2,
        explanation: "Because light travels slower in water than in air, the light rays coming from the straw bend when they leave the water to reach your eye. Your brain gets confused by the bent light, making the straight straw look snapped!"
      },
      {
        q: "What happens to a light beam when it enters something thicker, like a solid piece of glass?",
        options: [
          "It speeds up and bends outward",
          "It slows down and bends inward",
          "It stops moving completely",
          "It doesn't bend at all"
        ],
        answer: 1,
        explanation: "Glass is 'denser' (thicker) than air, which acts like traffic and slows the light down. When light slows down, it bends inward towards the center straight line (the normal)."
      },
      {
        q: "Why do swimming pools always look shallower than they actually are?",
        options: ["Because water is heavy", "Because the blue color tricks you", "Because the light leaving the water bends, changing how deep it looks", "Because pools have flat bottoms"],
        answer: 2,
        explanation: "When light rays bounce off the bottom of the pool and leave the water, they bend in the air. This bent light reaches your eyes and tricks your brain into thinking the bottom of the pool is much closer to the surface than it really is!"
      },
      {
        q: "What does 'Snell's Law' help scientists calculate?",
        options: [
          "How hot the sun is",
          "Exactly how much a beam of light will bend when entering water or glass",
          "How fast sound travels",
          "The color of a rainbow"
        ],
        answer: 1,
        explanation: "Snell's law is a super helpful math formula. By knowing how thick the glass or water is, scientists can use Snell's Law to predict the exact angle the light beam will bend!"
      }
    ]
  },
  5: {
    topic: "Dispersion of Light",
    questions: [
      {
        q: "What happens if you shine plain white sunlight into a glass triangle (a prism)?",
        options: [
          "It turns into black light",
          "It gets much brighter",
          "It splits into the 7 beautiful colors of the rainbow",
          "It catches on fire"
        ],
        answer: 2,
        explanation: "Surprise! White light is actually a hidden mixture of all the colors of the rainbow! The glass prism bends each color slightly differently, separating them out so you can see them all."
      },
      {
        q: "What is the correct order of the 7 colors hidden inside white light?",
        options: [
          "Violet, Indigo, Blue, Green, Yellow, Orange, Red (VIBGYOR)",
          "Red, White, Blue",
          "Black, White, Grey",
          "Pink, Purple, Blue, Green, Yellow"
        ],
        answer: 0,
        explanation: "VIBGYOR is an easy way to remember the rainbow! It starts with Violet (the most bent color) and ends with Red (the least bent color)."
      },
      {
        q: "If you look at the colors of light as tiny waves, which color has the longest, widest waves?",
        options: ["Violet", "Blue", "Green", "Red"],
        answer: 3,
        explanation: "Red light has the longest waves in the rainbow. Because its waves are so long and wide, red light doesn't scatter or get blocked easily, which is exactly why stop signs and brake lights are painted red—so you can see them from far away!"
      },
      {
        q: "What acts like millions of tiny glass prisms in the sky to create a beautiful rainbow?",
        options: [
          "Clouds blocking the sun",
          "Air pollution",
          "Tiny raindrops bending and splitting sunlight",
          "Birds flying in a circle"
        ],
        answer: 2,
        explanation: "After a rainstorm, the air is full of tiny water droplets. When sunlight enters a raindrop, the water acts like a prism—it bends the light and splits it into 7 colors, bouncing it back to your eyes as a giant rainbow!"
      },
      {
        q: "When white light is split by a prism, which color bends the sharpest?",
        options: ["Red", "Green", "Yellow", "Violet"],
        answer: 3,
        explanation: "Violet has the shortest, tightest waves of all the colors. Because its waves are so tiny, it gets slowed down and bent the most when passing through the thick glass."
      }
    ]
  },
  6: {
    topic: "Light Energy",
    questions: [
      {
        q: "How do solar panels on houses create electricity?",
        options: [
          "By boiling water to make steam",
          "By using special 'solar cells' to turn sunlight directly into electricity",
          "By spinning like a windmill",
          "By soaking up the heat"
        ],
        answer: 1,
        explanation: "Solar panels are covered in special 'solar cells' (photovoltaic cells). When sunlight hits them, the light energy acts like a hammer, knocking tiny electrons loose inside the metal. These moving electrons flow into the house as electricity!"
      },
      {
        q: "How do plants and trees use sunlight to survive and grow?",
        options: ["By staying warm", "By sweating out water", "By using light to cook their own food (Photosynthesis)", "By turning it into dirt"],
        answer: 2,
        explanation: "Plants act like tiny solar factories! They use the energy from sunlight to magically cook water and carbon dioxide from the air into sweet sugar food and fresh oxygen for us to breathe. This superpower is called Photosynthesis."
      },
      {
        q: "How does light energy travel all the way from the Sun, across the empty vacuum of outer space, to reach Earth?",
        options: [
          "As sound waves",
          "On tiny space particles",
          "As a special energy wave called an 'Electromagnetic Wave'",
          "Through a long tube"
        ],
        answer: 2,
        explanation: "Sound needs air to travel, which is why space is totally silent! But light travels as a special kind of energy wave (an electromagnetic wave) that doesn't need air or water to carry it. It can travel perfectly through the empty nothingness of space!"
      },
      {
        q: "If you zoom in super, super close, light is actually made of trillions of tiny packets of energy called:",
        options: ["Neutrons", "Photons", "Electrons", "Protons"],
        answer: 1,
        explanation: "Light is very weird! Even though it acts like a wave, it is also made of trillions of microscopic 'energy bullets' called Photons. A photon is the smallest possible piece of light in the universe!"
      },
      {
        q: "Why do you need to wear sunscreen to protect against the Sun's UV (Ultraviolet) rays?",
        options: [
          "Because they are so bright they blind you",
          "Because they carry so much energy they can burn your skin cells",
          "Because they make you freeze",
          "Because they turn you purple"
        ],
        answer: 1,
        explanation: "UV rays are a type of invisible light from the Sun that packs a massive amount of energy. If they hit your bare skin for too long, they act like tiny lasers, damaging your skin cells and causing painful sunburns."
      }
    ]
  }
};
