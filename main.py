from numpy.lib.function_base import disp
from psychopy import clock, event, visual
from context import Abort, SortContext
from task import Task

with SortContext('settings.json') as ctx:

    mouse = event.Mouse(visible = True, win = ctx.win)

    # Setting up timers.

    duration = clock.CountdownTimer(ctx.settings['duration'])
    feedback_timer = clock.CountdownTimer(start = 0)
    switch_timer = clock.CountdownTimer(start = 0.5)

    # Setting up ui elements (not counting the task itself).

    task_background = visual.Rect(
        win = ctx.win, fillColor = 'white', pos = (0.225, 0.225), size = (1.45, 1.45)
    )

    merge_box_a = visual.TextBox2(
        win = ctx.win, text = None, pos = (-0.875, 0.8), size = (0.15, 0.07),
        color = 'black', fillColor = 'white', editable = True,
        font = 'Open Sans', letterHeight = 0.03
    )
    merge_box_b = visual.TextBox2(
        win = ctx.win, text = None, pos = (-0.625, 0.8), size = (0.15, 0.07),
        color = 'black', fillColor = 'white', editable = True,
        font = 'Open Sans', letterHeight = 0.03
    )

    merge_button = visual.Rect(
        win = ctx.win, fillColor = 'white',
        pos = (-0.75, 0.7), size = (0.4, 0.1)
    )
    merge_icon = visual.ImageStim(
        win = ctx.win, image = 'images/merge-01.png',
        pos = (-0.75, 0.7), size = (0.16875, 0.3)
    )
    button_feedback = visual.Rect(
        win = ctx.win, lineColor = 'green',
        pos = (-0.75, 0.7), size = (0.4, 0.1), fillColor = None,
        lineWidth = 20
    )
    cost_preview = visual.TextStim(
        win = ctx.win, text = None, pos = (-0.75, 0.6), height = 0.05
    )

    cost_counter = visual.TextStim(
        win = ctx.win, text = None, pos = (-0.75, 0.5), height = 0.05
    )

    # Demo only.

    skip_button = visual.Rect(
        win = ctx.win, fillColor = 'white', size = (0.4, 0.1), pos = (0.75, -0.75)
    )
    skip_text = visual.TextStim(
        win = ctx.win, text = 'SKIP (demo only)', color = 'black', pos = (0.75, -0.75),
        height = 0.05
    )

    # New idea: "Retry" and "Next" buttons, so that participants can revisit a task (once?) and
    # figure out how to reduce cost by applying merge efficiently.

    ATTEMPTS = 2
    attempts = ATTEMPTS
    show_previous = False

    retry_button = visual.Rect(
        win = ctx.win, fillColor = 'white',
        pos = (-0.25, -0.75), size = (0.4, 0.1)
    )
    next_button = visual.Rect(
        win = ctx.win, fillColor = 'white',
        pos = (0.25, -0.75), size = (0.4, 0.1)
    )
    retry_text = visual.TextStim(
        win = ctx.win, text = 'Retry', color = 'black',
        pos = (-0.25, -0.75), height = 0.05
    )
    next_text = visual.TextStim(
        win = ctx.win, text = 'Next', color = 'black',
        pos = (0.25, -0.75), height = 0.05
    )
    previous = visual.TextStim(
        win = ctx.win, text = None, pos = (-0.75, 0.4), height = 0.05
    )

    for task in ctx.tasks:

        if attempts > 1:
            task_retry = task.copy()
        display = Task(task, ctx.win)

        # Reset timers.

        duration.reset(300)
        feedback_timer.reset(0)
        switch_timer.reset(0.5)

        # Initialize pre-inner-loop variables.

        oneclick = True

        total_cost = 0
        cost_counter.text = 'Total Cost: %d'%(total_cost)

        done = False
        complete = False
        attempts -= 1

        while not done and duration.getTime() > 0:

            # Gather information about relevant keyboard and mouse inputs.

            keys = event.getKeys(keyList = ['escape', 'return', 'tab'])
            mouse1 = mouse.getPressed()[0]

            # Force close condition.
            
            if 'escape' in keys:
                raise Abort

            # Check if the task is completed

            if len(display.list) == 1:
                complete = True

            # Display Cost preview. Set draw_preview to False, then to True if the action applies.
            # I want to draw everything in tne same place, so I take this extra route.

            draw_preview = False
            if merge_box_a.text in display.names and merge_box_b.text in display.names:
                preview = display.merge_cost(merge_box_a.text, merge_box_b.text)
                cost_preview.text = 'Cost: %d'%(preview)
                draw_preview = True

            # Merge button functionality with double input protection.

            if mouse1 == False and oneclick == True:
                oneclick = False

            if mouse1 == True and oneclick == False:
                click = mouse.getPos()
                oneclick = True

                if not complete:
                    if click[0] > -0.95 and click[0] < -0.55 and click[1] > 0.65 and click[1] < 0.75:
                        feedback_timer.reset(0.5)
                        merge_cost = display.merge_cost(merge_box_a.text, merge_box_b.text)
                        total_cost += merge_cost
                        if display.merge(merge_box_a.text, merge_box_b.text):
                            cost_counter.text = 'Total Cost: %d'%(total_cost)
                            ctx.data.addData('merge_%d'%(total_cost), [merge_box_a.text, merge_box_b.text])

                # Merge input boxes selection.

                if click[0] > -0.95 and click[0] < -0.8 and click[1] > 0.765 and click [1] < 0.835:
                    ctx.win.currentEditable = merge_box_a

                if click[0] > -0.7 and click[0] < -0.55 and click[1] > 0.765 and click [1] < 0.835:
                    ctx.win.currentEditable = merge_box_b

                # Skip button functionality (demo only).

                if click[0] > 0.55 and click[0] < 0.95 and click[1] > -0.8 and click[1] < -0.6:
                    attempts = ATTEMPTS
                    done = True

                # Retry and Next buttons, only if task complete

                if complete:
                    if click[0] > -0.45 and click[0] < -0.05 and click[1] > -0.8 and click[1] < -0.6 and attempts > 0:
                        index = ctx.tasks.index(task) + 1
                        ctx.tasks.insert(index, task_retry)
                        previous.text = 'Previous cost: %d'%(total_cost)
                        show_previous = True                     
                        done = True
                    if click[0] > 0.05 and click[0] < 0.45 and click[1] > -0.8 and click[1] < -0.6:
                        attempts = ATTEMPTS
                        show_previous = False
                        done = True

            # Adding support for tab-switching between boxes. Currently only works for switching to box b.

            if switch_timer.getTime() < 0 and 'tab' in keys:
                if ctx.win.currentEditable == merge_box_a:
                    ctx.win.currentEditable = merge_box_b
                    switch_timer.reset(0.5)

            # Update the current task state.

            display.update()

            # Draw everything.

            task_background.draw()
            display.draw()
            merge_box_a.draw()
            merge_box_b.draw()
            merge_button.draw()
            merge_icon.draw()
            cost_counter.draw()
            skip_button.draw()
            skip_text.draw()

            if feedback_timer.getTime() > 0:
                button_feedback.draw()

            if draw_preview:
                cost_preview.draw()

            if show_previous:
                previous.draw()

            if complete:
                next_button.draw()
                next_text.draw()
                if attempts > 0:
                    retry_button.draw()
                    retry_text.draw()

            ctx.win.flip()

        ctx.data.addData('total comparisons', total_cost) 
        ctx.data.nextEntry()