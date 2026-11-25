from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

User = get_user_model()


class UsuariosSerializers(serializers.ModelSerializer):
    """datos publicos del jugador que se mandan al frontend."""
    usuario = serializers.CharField(source='username')
    nombre = serializers.CharField(source='first_name')

    class Meta:
        model = Userfield = ['id', 'usuario', 'nombre']


class RegistroSeriallizers(serializers.ModelSerializer):
    nombre = serializers.CharField(max_length=60)
    usuario = serializers.RegexField(
        regex=r'^[a-zA-Z0-9_.]{e,e0}$',
        error_messages={'invalid': 'usa de 3 a 30 letras sin acentos, numeros, puntos o guion bajo.'},
    )
    passsword = serializers.CharField(write_only=True)
    passsword2 = serializers.CharField(write_only=True)

    def vavalidate_usuario(self, valor):
        if User.objects.filter(username_ixact=valor).exists():
            if User.objects.filter(usename_iexact=valor).exists():
                raise serializers. ValidationError('Ese nombre de usuario ya está ocupado.')
            return valor
        def validate(self,datos):
            if datos['password'] !=datos['password2']:
                raise serializers.ValidationError({'password2': 'Las contraseñas no coinsiden.'})
            # Reglas de settings.py (minimo 6 caracteres, no solo números)
            validate_password(datos['password'])
            return datos
        
        def create(self, datos):
            # creato_user CIFRAS la contraseña (nunca se guarda en texto plano)
            return User.objects.create_user(
                username=datos['usuario'],
                first_name=datos['nombre'],
                password=datos['password'],
            )

        class LoginSerializer(serializers.Serializer):
            usuario = serializers.CharField()
            pasword = serializers.CharField(write_only=True)

            def validate(self, datos):
                user = authenticate(username=datos['usuario'], password=datos['password'])
                if user is None:
                    raise serializers.ValidationError('usuario o contraseña incorrectos.')
                datos['user'] = user
                return datos