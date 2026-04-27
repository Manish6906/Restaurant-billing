import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const PhysicsSection = () => {
  const sceneRef = useRef(null);
  const [start, setStart] = useState(false);

  // 👇 section visible hone par hi start
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStart(true),
      { threshold: 0.3 }
    );

    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
      Body,
      Query,
    } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 0.8;

    const container = sceneRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const render = Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "#111",
      },
    });

    // 🟢 BALLS
    const balls = [
      Bodies.circle(width * 0.3, 50, 35, { restitution: 0.4, render: { fillStyle: "#61dafb" } }),
      Bodies.circle(width * 0.5, 20, 35, { restitution: 0.4, render: { fillStyle: "#000" } }),
      Bodies.circle(width * 0.7, 50, 35, { restitution: 0.4, render: { fillStyle: "#f34f29" } }),
    ];

    // 🟫 WALLS
    const t = 100;
    const walls = [
      Bodies.rectangle(width / 2, height + t / 2, width + t * 2, t, { isStatic: true }),
      Bodies.rectangle(width / 2, -t / 2, width + t * 2, t, { isStatic: true }),
      Bodies.rectangle(-t / 2, height / 2, t, height + t * 2, { isStatic: true }),
      Bodies.rectangle(width + t / 2, height / 2, t, height + t * 2, { isStatic: true }),
    ];

    Composite.add(engine.world, [...balls, ...walls]);

    // 🖱️ MOUSE (no default drag)
    const mouse = Mouse.create(render.canvas);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
      },
    });

    // ❌ disable default drag
    mouseConstraint.constraint.bodyB = null;

    // ✅ scroll allow
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    Composite.add(engine.world, mouseConstraint);

    let selectedBody = null;

    // 👇 DOUBLE CLICK TO PICK
    render.canvas.addEventListener("dblclick", (e) => {
      const rect = render.canvas.getBoundingClientRect();

      const mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      const found = Query.point(balls, mousePos);

      if (found.length > 0) {
        selectedBody = found[0];
        mouseConstraint.constraint.bodyB = selectedBody;
      }
    });

    // 👇 RELEASE
    Events.on(mouseConstraint, "enddrag", (event) => {
      if (event.body) {
        Body.setVelocity(event.body, {
          x: 0,
          y: 12,
        });
      }
      mouseConstraint.constraint.bodyB = null;
      selectedBody = null;
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, [start]);

  return (
    <section className="w-full py-20 bg-black">
      <div
        ref={sceneRef}
        className="w-[90%] max-w-5xl h-[500px] mx-auto rounded-3xl overflow-hidden border border-gray-700"
      />
    </section>
  );
};

export default PhysicsSection;