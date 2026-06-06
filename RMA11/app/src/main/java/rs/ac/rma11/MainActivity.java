package rs.ac.rma11;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private static final String POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/pikachu";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button button = findViewById(R.id.buttonPull);
        TextView text = findViewById(R.id.textViewContent);

        button.setOnClickListener(v -> {
            text.setText("Loading...");

            Api.fetch(POKEMON_URL, new Api.Callback() {
                @Override
                public void onSuccess(String json) {
                    try {
                        Pokemon pokemon = Pokemon.fromJson(json);
                        text.setText(pokemon.toString());
                    } catch (Exception e) {
                        e.printStackTrace();
                        text.setText("Parsing error!");
                    }
                }

                @Override
                public void onError(Exception e) {
                    e.printStackTrace();
                    text.setText("Network error.");
                }
            });
        });
    }
}
