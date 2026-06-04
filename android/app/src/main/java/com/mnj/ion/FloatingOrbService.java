package com.mnj.ion;

import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.IBinder;
import android.view.Gravity;
import android.view.WindowManager;
import android.widget.TextView;

public class FloatingOrbService extends Service {

    private WindowManager windowManager;
    private TextView orbView;

    @Override
    public void onCreate() {
        super.onCreate();

        windowManager =
                (WindowManager) getSystemService(WINDOW_SERVICE);

        orbView = new TextView(this);

        orbView.setText("◉");
        orbView.setTextSize(40);
        orbView.setPadding(20,20,20,20);

        WindowManager.LayoutParams params =
                new WindowManager.LayoutParams(
                        WindowManager.LayoutParams.WRAP_CONTENT,
                        WindowManager.LayoutParams.WRAP_CONTENT,
                        WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
                        WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                        PixelFormat.TRANSLUCENT
                );

        params.gravity = Gravity.TOP | Gravity.START;
        params.x = 100;
        params.y = 300;

        windowManager.addView(orbView, params);
    }

    @Override
    public void onDestroy() {

        super.onDestroy();

        if (orbView != null) {
            windowManager.removeView(orbView);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}

